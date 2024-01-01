import { useArticleAPI } from '~/service/module/article'

export const useHomeStore = defineStore({
  id: 'home',
  state: () => ({
    articleList: []
  }),

  actions: {
    async fetchArticleList(pageNumber: number,pageSize: number) {
      const result = await useArticleAPI().getArticleList(pageNumber,pageSize)
      this.articleList = result.data.list
    }
  },
})
