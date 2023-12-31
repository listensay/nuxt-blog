export const useImageAPI = () => {
  return {
    list: (id: string, pageNumber: number, pageSize: number) => {
      return useRequestGet('/api/image/image', { id, pageNumber, pageSize })
    },
    create: (data: any) => {
      return useRequestPost('/api/image/image', data)
    },
    update: (data: any) => {
      return useRequestPut('/api/image', data)
    },
    delete: (id: string) => {
      return useRequestDelete('/api/image', { id })
    }
  }
}
