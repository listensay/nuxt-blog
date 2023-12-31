import Joi from 'joi'

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as any
  const login = isLogin(event)

  const schema = Joi.object({
    id: Joi.number().min(1),
    pageNumber: Joi.number().min(1).required(),
    pageSize: Joi.number().min(1).required()
  })

  try {
    await schema.validateAsync(query)
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
    const images = await getImages(query.id, query.pageNumber, query.pageSize)
    if (!images) {
      setResponseStatus(event, 500)
      return errorRes('获取失败', 500)
    }

    return successRes(images, '获取成功')
  } catch (error) {
    console.log(error)
    setResponseStatus(event, 500)
    return errorRes('服务器错误', 500)
  }
})
