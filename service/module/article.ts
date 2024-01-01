export const useArticleAPI = () => {
  return {
    getArticleList(pageNumber: number, pageSize: number) {
      return useRequestGet('/api/front-end/article/list', {
        pageNumber,
        pageSize
      })
    }
  }
}
