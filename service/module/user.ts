export const useUserAPI = () => {
  return {
    login: (user: any) => {
      return useRequestPost('/api/auth/login', {
        username: user.username,
        password: user.password
      })
    }
  }
}
