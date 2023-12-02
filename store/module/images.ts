import { useImageCategoryAPI } from "~/service/module/images/categoty"

export const useImagesStore = defineStore('useImagesStore', {
  state: () => ({
    images: [],
    imageCategory: [],
    imageCategoryTotal: 0
  }),
  actions: {
    // 获取图片分类
    async fetchGetImagesCategory(pageNumber: number = 1, pageSize: number = 10) {
      try {
        const result = await useImageCategoryAPI().list(pageNumber, pageSize)
        this.imageCategory = result.data.list
        this.imageCategoryTotal = result.data.total
      } catch (error) {
        console.log(error)
      }
    },
    // 创建图片分类
    async fetchCreateImageCategory(data: any) {
      try {
        const result = await useImageCategoryAPI().create(data)
        await this.fetchGetImagesCategory()
        return result
      } catch (error) {
        console.log(error)
      }
    },
    async fetchUpdateImageCategory(data: any) {
      try {
        const result = await useImageCategoryAPI().update(data)
        await this.fetchGetImagesCategory()
        return result
      } catch (error) {
        console.log(error)
      }
    }
  }
})
