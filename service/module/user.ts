export const useUserAPI = () => {
  return {
    login: (user: any) => {
      return useRequestPost('/api/login', {
        username: user.username,
        password: user.password
      })
    },
    getUserInfo: () => {
      return useRequestGet('/api/auth/user/userinfo')
    },
    changeUserInfo: (data: any) => {
      return useRequestPost('/api/auth/user/userinfo', data)
    }
  }
}
