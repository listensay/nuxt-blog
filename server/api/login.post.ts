import Joi from 'joi'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

/**
 * 接收前端传过来的username，password
 * 查询username在数据库中是否存在，username不存在返回：“账号或密码错误”
 * 校验账号密码，成功就生成token
 */

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 校验数据joi
  const schema = Joi.object({
    username: Joi.string().min(3).max(18).required(),
    password: Joi.string().min(6).max(18).required()
  })

  try {
    await schema.validateAsync(body)
  } catch (err) {
    return errorRes('用户名或密码格式不正确', 400)
  }

  try {
    // 查询username是否存在
    const user = await getUserByUsername(body.username)
    if (!user) {
      return errorRes('用户名不存在', 400)
    }

    // 校验账号密码是否正确
    const isPasswordValid = bcrypt.compareSync(body.password, user.password)

    if (isPasswordValid) {
      const secret = useRuntimeConfig().tokenSecret
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
          uid: user.id
        },
        secret
      )

      return successRes({ token }, '登录成功！')
    }

    return errorRes('账号或密码错误', 400)
  } catch (error) {
    console.log(error)
    return errorRes('服务器错误', 500)
  }
})
