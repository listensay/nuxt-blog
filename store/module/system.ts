import { ar } from "element-plus/es/locale";
import { useSystemAPI } from "~/service/module/system";

export const useSystemStore = defineStore('useSystemStore', {
  state: () => ({
    articleList: [],
    articleTotal: 0,
    articleDetail: {}
  }),
  actions: {
    async fetchCreateArticle(data: any) {
      try {
        return await useSystemAPI().createArticle(data)
      } catch (error) {}
    },
    async fetchArticleList(pageNumber: number, pageSize: number) {
      try {
        const articleList = await useSystemAPI().getArticleList(pageNumber, pageSize)
        this.articleList = articleList.data.list
        this.articleTotal = articleList.data.total
      } catch (error) {}
    },
    async fetchDeleteArticle(id: number) {
      try {
        return await useSystemAPI().deleteArticle(id)
      } catch (error) {}
    },
    async fetchArticleDetail(id: number) {
      try {
        const result = await useSystemAPI().getArticleDetail(id)
        this.articleDetail = result.data
      } catch (error) {}
    },
    async fetchUpdateArticle(id: number, data: any) {
      try {
        return await useSystemAPI().updateArticle(id, data)
      } catch (error) {}
    }
  }
});