export const useImageCategoryAPI = () => {
  return {
    list: (pageNumber: number, pageSize: number) => {
      return useRequestGet('/api/image/category', { pageNumber, pageSize })
    },
    create: (data: any) => {
      return useRequestPost('/api/image/category', data)
    },
    update: (data: any) => {
      return useRequestPut('/api/image/category', data)
    },
    delete: (id: string) => {
      return useRequestDelete('/api/image/category', { id })
    }
  }
}
