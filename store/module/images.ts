import { useImageCategoryAPI } from "~/service/module/images/categoty"
import { useImageAPI } from "~/service/module/images/image"

export const useImagesStore = defineStore('useImagesStore', {
  state: () => ({
    images: [],
    imagesTotal: 0,
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
    // 修改图片分类
    async fetchUpdateImageCategory(data: any) {
      try {
        const result = await useImageCategoryAPI().update(data)
        await this.fetchGetImagesCategory()
        return result
      } catch (error) {
        console.log(error)
      }
    },
    // 删除图片分类
    async fetchDeleteImageCategory(id: string) {
      try {
        const result = await useImageCategoryAPI().delete(id)
        await this.fetchGetImagesCategory()
        return result
      } catch (error) {
        console.log(error)
      }
    },
    // 获取图片列表
    async fetchGetImages(id: string, pageNumber: number = 1, pageSize: number = 10) {
      try {
        const result = await useImageAPI().list(id, pageNumber, pageSize)
        this.images = result.data
        return result
      } catch (error) {
        console.log(error)
      }
    },
    // 创建图片
    async fetchCreateImage(data: any) {
      try {
        const result = await useImageAPI().create(data)
        await this.fetchGetImages(data.categoryId)
        return result
      } catch (error) {
        console.log(error)
      }
    },
  }
})
