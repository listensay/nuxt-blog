// 创建分类
import Joi from 'joi'

export default defineEventHandler(async (_event) => {
  const body = await readBody(_event)
  const con = getDB()

  const userinfo = isLogin(_event)
  if (userinfo === 0) {
    setResponseStatus(_event, 401)
    return errorRes('请登录')
  }

  const schema = Joi.object({
    name: Joi.string().min(2).max(10).required()
  })

  try {
    await schema.validateAsync(body)
  } catch (error) {
    console.log(error)
    setResponseStatus(_event, 400)
    return errorRes('参数有误')
  }

  try {
    const [rows] = <any>(
      await con.execute(`select * from listen_images_category where name = ?`, [
        body.name
      ])
    )

    if (rows.length > 0) {
      setResponseStatus(_event, 400)
      return errorRes('分类已存在')
    }

    const [row] = <any>await con.execute(
      `
      INSERT INTO listen_images_category (name)
      VALUES (?)
    `,
      [body.name]
    )

    if (row.affectedRows === 0) {
      setResponseStatus(_event, 400)
      return errorRes('创建失败')
    }

    return successRes(body, '创建成功')
  } catch (error) {
    console.log(error)
    setResponseStatus(_event, 500)
    return errorRes()
  } finally {
    con.end()
  }
})
