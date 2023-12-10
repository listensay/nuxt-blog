/**
 * @description 获取图片分类列表
 * @param pageNumber 分类页码
 * @param pageSize 分类数量
 * @returns 分类列表
 */
export const getImageCategory = async (
  pageNumber: number,
  pageSize: number
) => {
  return await usePrisma.imagesCategory.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: Number(pageSize),
    orderBy: {
      id: 'desc'
    }
  })
}

/**
 * @description 修改图片分类
 * @param id 分类ID
 * @param data 分类信息
 * @returns 分类列表
 */
export const updateImageCategory = async (id: number, data: any) => {
  return await usePrisma.imagesCategory.update({
    where: {
      id: Number(id)
    },
    data
  })
}

/**
 * @description 删除图片分类
 * @param data 分类ID
 * @returns 分类信息
 */
export const deleteImageCategory = async (id: number) => {
  return await usePrisma.imagesCategory.delete({
    where: {
      id: Number(id)
    }
  })
}

/**
 * @description 创建图片分类
 * @param data 分类信息
 * @returns 分类信息
 */
export const createImageCategory = async (data: any) => {
  return await usePrisma.imagesCategory.create({
    data
  })
}

/**
 * @description 根据分类名称获取分类信息
 * @param name 分类名称
 * @returns 分类信息
 */
export const getImageCategoryByName = async (name: string) => {
  return await usePrisma.imagesCategory.findUnique({
    where: {
      name
    }
  })
}

/**
 * @description 根据分类ID获取分类信息
 * @param id 分类ID
 * @returns 分类信息
 */
export const getImageCategoryById = async (id: number) => {
  return await usePrisma.imagesCategory.findUnique({
    where: {
      id: Number(id)
    }
  })
}

export const addImage = async (data: any) => {
  data.category_id = Number(data.category_id)
  return await usePrisma.images.create({ data })
}
