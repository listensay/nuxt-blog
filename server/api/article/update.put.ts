import Joi from 'joi'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    const uid = isLogin(event)
    if (uid === 0) {
      setResponseStatus(event, 401)
      return errorRes('请登录', 401)
    }

    const schema = Joi.object({
      id: Joi.number().required(),
      title: Joi.string().min(2).max(20).required(),
      content: Joi.string().required()
    })

    try {
      await schema.validateAsync(body)
    } catch (error) {
      setResponseStatus(event, 400)
      return errorRes('参数有误', 400)
    }

    const article = await updateArticle(Number(body.id), {
      title: body.title,
      content: body.content,
      author_id: uid
    })
    if (!article) {
      setResponseStatus(event, 500)
      return errorRes('更新失败', 500)
    }

    return successRes('更新成功')
  } catch (error) {
    console.log('error', error)
    setResponseStatus(event, 500)
    return errorRes('服务器错误', 500)
  }
})
