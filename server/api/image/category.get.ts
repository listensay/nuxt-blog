import { getImageCategory } from '~/server/utils/prisma/imageCategory'

export default defineEventHandler(async (_event) => {
  const query = <any>getQuery(_event)

  try {
    const uid = isLogin(_event)

    if (uid === 0) {
      setResponseStatus(_event, 401)
      return errorRes('请登录', 401)
    }

    if (!query.pageNumber && !query.pageSize) {
      query.pageNumber = 1
      query.pageSize = 10
    }

    const category = await getImageCategory(query.pageNumber, query.pageSize)
    const total = await usePrisma.imagesCategory.findMany()

    return successRes({
      list: category,
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
      total: total.length
    })
  } catch (error) {
    console.log(error)
    setResponseStatus(_event, 500)
    return errorRes('服务器错误', 500)
  }
})
