import Joi from 'joi'
import { getArticleList } from '~/server/utils/prisma/article'

export default defineEventHandler(async (event) => {
  const body = getQuery(event)
  const uid = isLogin(event)
  if (uid === 0) {
    setResponseStatus(event, 401)
    return errorRes('请登录', 401)
  }

  const schema = Joi.object({
    pageNumber: Joi.number().required(),
    pageSize: Joi.number().required()
  })

  try {
    await schema.validateAsync(body)
  } catch (error) {
    setResponseStatus(event, 400)
    return errorRes('参数有误', 400)
  }

  const { pageNumber, pageSize } = body as any

  try {
    const articleList = await getArticleList(pageNumber, pageSize)
    const total = await usePrisma.article.findMany()
    if (!articleList) {
      setResponseStatus(event, 500)
      return errorRes('获取失败', 500)
    }

    return successRes({
      list: articleList,
      pageNumber,
      pageSize,
      total: total.length
    })
  } catch (error) {
    console.log('error', error)
    setResponseStatus(event, 500)
    return errorRes('服务器错误', 500)
  }
})
