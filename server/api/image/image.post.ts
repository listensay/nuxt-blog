import Joi from 'joi'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const login = isLogin(event)

  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    url: Joi.string().required(),
    category_id: Joi.string().required()
  })

  try {
    await schema.validateAsync(body)
  } catch (error) {
    console.log(error)
    setResponseStatus(event, 400)
    return errorRes('参数错误', 400)
  }

  if (login === 0) {
    setResponseStatus(event, 401)
    return errorRes('请登录', 401)
  }

  try {
    const image = await addImage(body)
    if (!image) {
      setResponseStatus(event, 500)
      return errorRes('上传失败', 500)
    }

    return successRes(image, '上传成功')
  } catch (error) {
    console.log(error)
    setResponseStatus(event, 500)
    return errorRes('服务器错误', 500)
  }
})
