export default defineEventHandler(async (_event) => {
  const body = await readBody(_event)
  const con = getDB()

  try {
    const userinfo = isLogin(_event)

    if (userinfo === 0) {
      setResponseStatus(_event, 401)
      return errorRes('请登录', 401)
    }

    const [rows] = <any>(
      await con.execute(`delete from listen_images_category where id = ?`, [
        body.id
      ])
    )

    if (rows.affectedRows === 0) {
      setResponseStatus(_event, 400)
      return errorRes('删除失败', 400)
    }

    return successRes('删除成功')
  } catch (error) {
    console.log(error)
    setResponseStatus(_event, 500)
    return errorRes('服务器错误', 500)
  } finally {
    con.end()
  }
})
