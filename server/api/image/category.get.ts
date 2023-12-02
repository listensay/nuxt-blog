export default defineEventHandler(async (_event) => {
  const query = <any>getQuery(_event)
  const con = getDB()

  try {
    const userinfo = isLogin(_event)

    if (userinfo === 0) {
      setResponseStatus(_event, 401)
      return errorRes('请登录', 401)
    }

    if (!query.pageNumber && !query.pageSize) {
      query.pageNumber = 1
      query.pageSize = 10
    }

    const offset = (query.pageNumber - 1) * query.pageSize

    const [rows] = <any>(
      await con.execute(
        `select * from listen_images_category LIMIT ? OFFSET ?`,
        [query.pageSize, offset]
      )
    )

    const [total] = <any>(
      await con.execute(`select count(*) as total from listen_images_category`)
    )

    return successRes({
      list: rows,
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
      total: total[0].total
    })
  } catch (error) {
    console.log(error)
    setResponseStatus(_event, 500)
    return errorRes('服务器错误', 500)
  } finally {
    con.end()
  }
})
