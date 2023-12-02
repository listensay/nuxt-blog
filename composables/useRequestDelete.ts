export const useRequestDelete = (url: string, params?: any) => {
  return useRequest(url, { method: 'delete', body: params })
}
