import Joi from 'joi'
import Bcrypt from 'bcryptjs'
import {
  createUser,
  getUserByEmail,
  getUserByUsername
} from '../utils/prisma/user'

export default defineEventHandler(async (_event) => {
  const body = await readBody(_event)
  // 校验数据joi
  const schema = Joi.object({
    username: Joi.string().min(3).max(18).required(),
    password: Joi.string().min(6).max(18).required(),
    nickname: Joi.string().min(2).max(10).required(),
    email: Joi.string().email().required()
  })
  try {
    await schema.validateAsync(body)
  } catch (err) {
    return errorRes('参数错误', 400)
  }

  try {
    const usernameResult = await getUserByUsername(body.username)
    // 判断用户名是否存在
    if (usernameResult) {
      setResponseStatus(_event, 400)
      return errorRes('用户名已存在', 400)
    }

    const emailResult = await getUserByEmail(body.email)
    console.log('email-------', emailResult)
    // 判断邮箱是否存在
    if (emailResult) {
      setResponseStatus(_event, 400)
      return errorRes('邮箱已存在', 400)
    }

    // 密码加密
    const password = Bcrypt.hashSync(body.password, 10)
    // 创建用户
    const user = await createUser({
      username: body.username,
      email: body.email,
      password,
      nickname: body.nickname
    })

    if (!user) {
      return errorRes('注册失败', 500)
    }

    return successRes('注册成功')
  } catch (error) {
    console.log(error)
    return errorRes('服务器错误', 500)
  }
})
