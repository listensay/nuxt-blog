import Joi from 'joi'
import { updateUser } from '~/server/utils/prisma/user'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const uid = isLogin(event)
  if (uid === 0) {
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
    profile: Joi.string().required()
  })

  try {
    await schema.validateAsync(body)
  } catch (error) {
    console.log(error)
    setResponseStatus(event, 400)
    return errorRes('参数有误', 400)
  }

  try {
    // 查询用户是否存在
    const userinfo = await getUserById(uid)
    if (!userinfo) {
      setResponseStatus(event, 400)
      return errorRes('用户不存在', 400)
    }
    // 判断邮箱是否存在
    const emailResult = await getUserByEmail(body.email)
    if (emailResult && emailResult.id !== uid) {
      setResponseStatus(event, 400)
      return errorRes('邮箱已存在', 400)
    }

    // 更新数据
    const user = await updateUser(uid, {
      nickname: body.nickname,
      email: body.email,
      desc: body.desc,
      avatar: body.avatar,
      profile: body.profile
    })

    if (!user) {
      setResponseStatus(event, 500)
      return errorRes('更新失败', 500)
    }

    return successRes('修改成功')
  } catch (error) {
    console.log('error', error)
    setResponseStatus(event, 500)
    return errorRes('服务器错误', 500)
  }
})
