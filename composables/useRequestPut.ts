export const useRequestPut = (url: string, params?: any) => {
  return useRequest(url, { method: 'put', body: params })
}
