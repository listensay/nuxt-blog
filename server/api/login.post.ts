import Joi from 'joi'
import jwt from 'jsonwebtoken'
import Bcrypt from 'bcryptjs'

/**
 * 接收前端传过来的username，password
 * 查询username在数据库中是否存在，username不存在返回：“账号或密码错误”
 * 校验账号密码，成功就生成token
 */

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const con = getDB()

  // 校验数据joi
  const schema = Joi.object({
    username: Joi.string().min(3).max(18).required(),
    password: Joi.string().min(6).max(18).required()
  })

  try {
    await schema.validateAsync(body)
  } catch (err) {
    return errorRes('账号或密码错误')
  }

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
        await con.execute('select * from listen_users where username = ?', [
          body.username
        ])
      )
      // 解密然后校验
      const isPasswordValid = Bcrypt.compareSync(
        body.password,
        user[0].password
      )

      if (isPasswordValid) {
        const secret = useRuntimeConfig().tokenSecret
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2,
            user_id: user[0].user_id
          },
          secret
        )

        return successRes({ token }, '登录成功！')
      } else {
        return errorRes('账号或密码错误')
      }
    } else {
      return errorRes('账号或密码错误')
    }
  } catch (error) {
    console.log(error)
    return errorRes()
  } finally {
    con.end()
  }
})
