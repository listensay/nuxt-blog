export const useRequestGet = (url: string, params?: any, headers?: any) => {
  return useRequest(url, { method: 'get', params }, headers)
}
