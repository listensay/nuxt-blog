import Joi from 'joi'
import Bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // 校验数据joi
  const schema = Joi.object({
    username: Joi.string().min(3).max(18).required(),
    password: Joi.string().min(6).max(18).required(),
    nickname: Joi.string().min(2).max(10).required()
  })

  try {
    await schema.validateAsync(body)
  } catch (err) {
    return errorRes('参数错误')
  }

  // 注册用户
  // 判断用户名是否存在
  const con = getDB()
  try {
    const result = <any>(
      await con.execute(
        'select username from listen_users where username = ?',
        [body.username]
      )
    )

    // 判断账号是否存在
    if (result[0].length > 0) {
      return errorRes('账号已注册')
    } else {
      /**
       * 1. 密码加密
       * 2. 创建账号
       */

      // 密码加密

      const password = Bcrypt.hashSync(body.password, 10)

      const [result] = <any>(
        await con.execute(
          'insert into `listen_users` (`username`,`password`,`nickname`) value (?,?,?)',
          [body.username, password, body.nickname]
        )
      )
      if (result.affectedRows === 1) {
        return successRes('注册成功！')
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return await errorRes('服务器错误')
  } finally {
    con.end()
  }
})
