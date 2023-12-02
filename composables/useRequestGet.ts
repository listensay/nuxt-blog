export const useRequestGet = (url: string, params?: any) => {
  return useRequest(url, { method: 'get', params })
}
