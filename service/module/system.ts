export const useSystemAPI = () => {
  return {
    createArticle: (data: any) => {
      return useRequestPost('/api/article/create', data)
    },
    getArticleList: (pageNumber: number, pageSize: number) => {
      return useRequestGet('/api/article/list', {
        pageNumber,
        pageSize
      })
    },
    deleteArticle: (id: number) => {
      return useRequestDelete('/api/article/delete', {
        id
      })
    },
    getArticleDetail: (id: number) => {
      return useRequestGet('/api/article/detail', {
        id
      })
    },
    updateArticle: (id: number, data: any) => {
      return useRequestPut('/api/article/update', {
        id,
        ...data
      })
    }
  }
}
