export const useUserAPI = () => {
  return {
    login: (user: any) => {
      return useRequestPost('/api/login', {
        username: user.username,
        password: user.password
      })
    },
    getUserInfo: () => {
      return useRequestGet('/api/auth/userinfo')
    }
  }
}
