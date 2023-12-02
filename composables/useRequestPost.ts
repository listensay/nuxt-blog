export const useRequestPost = (url: string, params?: any) => {
  return useRequest(url, { method: 'post', body: params })
}
