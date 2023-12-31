import { usePrisma } from '..'

/**
 * @description 发布文章
 * @param data 文章信息
 * @returns 文章信息
 */
export const addArticle = async (data: any) => {
  return await usePrisma.article.create({ data })
}

/**
 * @description 获取文章列表
 * @param pageNumber 文章页码
 * @param pageSize 文章数量
 * @returns 文章列表
 */
export const getArticleList = async (pageNumber: number, pageSize: number) => {
  return await usePrisma.article.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: Number(pageSize),
    orderBy: {
      id: 'desc'
    }
  })
}
/**
 * @description 删除文章
 * @param id 文章id
 * @returns 文章信息
 */
export const deleteArticle = async (id: number) => {
  return await usePrisma.article.delete({
    where: {
      id
    }
  })
}
/**
 * @description 获取文章详情
 * @param id 文章id
 * @returns 文章信息
 */
export const getArticleDetail = async (id: number) => {
  return await usePrisma.article.findUnique({
    where: {
      id
    }
  })
}
/**
 * @description 更新文章
 * @param id 文章id
 * @param data 文章信息
 * @returns 文章信息
 */
export const updateArticle = async (id: number, data: any) => {
  return await usePrisma.article.update({
    where: {
      id
    },
    data
  })
}
