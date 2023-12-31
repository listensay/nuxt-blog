/**
 * @description 获取图片列表
 * @param pageNumber 图片页码
 * @param pageSize 图片数量
 * @param categoryId 分类ID
 * @returns 图片列表
 * @todo 添加分类ID查询
 */

export const getImages = async (
  categoryId?: number,
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  if (categoryId) {
    // 有分类ID
    return await usePrisma.images.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: Number(pageSize),
      where: {
        category_id: Number(categoryId)
      },
      orderBy: {
        id: 'desc'
      }
    })
  } else {
    // 无分类ID
    return await usePrisma.images.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: Number(pageSize),
      orderBy: {
        id: 'desc'
      }
    })
  }
}

/**
 * @description 添加图片
 * @param data 图片信息
 * @returns 图片信息
 */
export const addImage = async (data: any) => {
  return await usePrisma.images.create({ data })
}
