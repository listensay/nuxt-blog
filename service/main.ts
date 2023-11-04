export const useMainAPI = () => {
  return {
    getWebOptions: () => {
      return useRequestGet('/api/listen-options')
    }
  }
}
