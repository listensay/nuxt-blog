import jwt from 'jsonwebtoken'
import Bcrypt from 'bcryptjs'

/**
 * 接收前端传过来的username，password
 * 查询username在数据库中是否存在，username不存在返回：“账号或密码错误”
 * 校验账号密码，成功就生成token
 */

export default defineEventHandler(async (_event) => {
  const body = await readBody(_event)
  const con = getDB()

  try {
    // 查询username是否存在
    const [result] = <any>(
      await con.execute(
        'select username from listen_users where username = ?',
        [body.username]
      )
    )
    if (result.length > 0) {
      // 校验账号密码是否正确
      const [user] = <any>(
        await con.execute(
          'select user_id, password from listen_users where username = ?',
          [body.username]
        )
      )
      // 解密然后校验
      const isPasswordValid = Bcrypt.compareSync(
        body.password,
        user[0].password
      )

      if (isPasswordValid) {
        const secret = 'eifuisedfuvs'
        const token = jwt.sign(
          { username: body.username, user_id: user[0].user_id },
          secret,
          {
            expiresIn: '2h'
          }
        )

        return successRes(token, '登录成功！')
      } else {
        return errorRes('账号或密码错误')
      }
    } else {
      return errorRes('账号或密码错误')
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return errorRes()
  } finally {
    con.end()
  }
})
