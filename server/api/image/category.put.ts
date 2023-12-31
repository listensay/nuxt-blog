import {
  getImageCategoryById,
  updateImageCategory
} from '~/server/utils/prisma/imageCategory'

export default defineEventHandler(async (_event) => {
  const body = await readBody(_event)

  try {
    const uid = isLogin(_event)

    if (uid === 0) {
      setResponseStatus(_event, 401)
      return errorRes('请登录', 401)
    }

    const category = await getImageCategoryById(body.id)
    if (!category) {
      setResponseStatus(_event, 400)
      return errorRes('分类不存在', 400)
    }

    const result = await updateImageCategory(body.id, {
      name: body.name
    })

    if (!result) {
      setResponseStatus(_event, 500)
      return errorRes('修改失败', 500)
    }

    return successRes('修改成功')
  } catch (error) {
    console.log(error)
    setResponseStatus(_event, 500)
    return errorRes('服务器错误', 500)
  }
})
