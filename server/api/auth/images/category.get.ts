export default defineEventHandler(async (_event) => {
  const con = getDB()

  try {
    const userinfo = isLogin(_event)

    if (userinfo === 0) {
      setResponseStatus(_event, 401)
      return errorRes('请登录', 401)
    }

    const [rows] = <any>(
      await con.execute(`select * from listen_images_category`)
    )

    return successRes({
      list: rows,
      total: rows.length
    })
  } catch (error) {
    console.log(error)
    setResponseStatus(_event, 500)
    return errorRes('服务器错误', 500)
  } finally {
    con.end()
  }
})
