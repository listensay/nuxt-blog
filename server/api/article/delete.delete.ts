import Joi from 'joi'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const uid = isLogin(event)
  if (uid === 0) {
    setResponseStatus(event, 401)
    return errorRes('请登录', 401)
  }

  const schema = Joi.object({
    id: Joi.number().required()
  })

  try {
    await schema.validateAsync(body)
  } catch (error) {
    setResponseStatus(event, 400)
    return errorRes('参数有误', 400)
  }

  try {
    const article = await deleteArticle(body.id)
    if (!article) {
      setResponseStatus(event, 500)
      return errorRes('删除失败', 500)
    }

    return successRes('删除成功')
  } catch (error) {
    console.log('error', error)
    setResponseStatus(event, 500)
    return errorRes('服务器错误', 500)
  }
})
