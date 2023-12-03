// 创建分类
import Joi from 'joi'
import {
  createImageCategory,
  getImageCategoryByName
} from '~/server/utils/prisma/imagesCategory'

export default defineEventHandler(async (_event) => {
  const body = await readBody(_event)

  const uid = isLogin(_event)
  if (uid === 0) {
    setResponseStatus(_event, 401)
    return errorRes('请登录', 401)
  }

  const schema = Joi.object({
    name: Joi.string().min(2).max(10).required()
  })

  try {
    await schema.validateAsync(body)
  } catch (error) {
    console.log(error)
    setResponseStatus(_event, 400)
    return errorRes('参数有误', 400)
  }

  try {
    const category = await getImageCategoryByName(body.name)
    if (category) {
      setResponseStatus(_event, 400)
      return errorRes('分类已存在', 400)
    }

    const result = await createImageCategory({
      name: body.name
    })

    if (!result) {
      setResponseStatus(_event, 500)
      return errorRes('创建失败', 500)
    }

    return successRes('创建成功')
  } catch (error) {
    console.log(error)
    setResponseStatus(_event, 500)
    return errorRes('服务器错误', 500)
  }
})
