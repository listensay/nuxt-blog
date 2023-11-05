export const useMainAPI = () => {
  return {
    getWebOptions: () => {
      return useRequestGet('/listen/listen-options')
    }
  }
}
