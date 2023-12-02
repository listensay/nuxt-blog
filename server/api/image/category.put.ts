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
      await con.execute(
        `update listen_images_category set name = ? where id = ?`,
        [body.name, body.id]
      )
    )

    if (rows.affectedRows === 0) {
      setResponseStatus(_event, 400)
      return errorRes('修改失败', 400)
    }

    return successRes('修改成功')
  } catch (error) {
    console.log(error)
    setResponseStatus(_event, 500)
    return errorRes('服务器错误', 500)
  } finally {
    con.end()
  }
})
