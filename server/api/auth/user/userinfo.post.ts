import Joi from 'joi'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const con = getDB()

  const userinfo = isLogin(event)

  if (userinfo === 0) {
    setResponseStatus(event, 401)
    return errorRes('请登录', 401)
  }

  /**
   * 修改用户信息
   *
   * 数据验证
   * 查询用户是否存在
   * 更新数据
   */

  // 数据验证
  const schema = Joi.object({
    nickname: Joi.string().min(2).max(10).required(),
    email: Joi.string().email().required(),
    desc: Joi.string().min(1).max(18).required(),
    avatar: Joi.string().required(),
    profile: Joi.array().required()
  })

  try {
    await schema.validateAsync(body)
  } catch (error) {
    console.log(error)
    setResponseStatus(event, 400)
    return errorRes('参数有误', 400)
  }

  try {
    const [rows] = <any>(
      await con.execute(
        'UPDATE `listen_users` SET `nickname`=?, `email`=?, `desc`=?, `avatar`=?, `profile`=? WHERE `user_id`=?',
        [
          body.nickname,
          body.email,
          body.desc,
          body.avatar,
          body.profile,
          userinfo.user_id
        ]
      )
    )

    if (rows.affectedRows === 1) {
      return successRes('修改成功')
    }
  } catch (error) {
    console.log('error', error)
    setResponseStatus(event, 500)
    return errorRes('服务器错误', 500)
  } finally {
    con.end()
  }
})
