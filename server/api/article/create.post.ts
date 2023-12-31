import Joi from 'joi'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const uid = isLogin(event)
  if (uid === 0) {
    setResponseStatus(event, 401)
    return errorRes('请登录', 401)
  }

  const schema = Joi.object({
    title: Joi.string().min(2).max(20).required(),
    content: Joi.string().required()
  })

  try {
    await schema.validateAsync(body)
  } catch (error) {
    setResponseStatus(event, 400)
    return errorRes('参数有误', 400)
  }

  try {
    const article = await addArticle({
      title: body.title,
      content: body.content,
      author_id: uid
    })

    if (!article) {
      setResponseStatus(event, 500)
      return errorRes('发布失败', 500)
    }

    return successRes('发布成功')
  } catch (error) {
    console.log('error', error)
    setResponseStatus(event, 500)
    return errorRes('服务器错误', 500)
  }
})
