import { useUserAPI } from "~/service/module/user"

const userAPI = useUserAPI()

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    userinfo: null,
    token: useCookie('accessToken')
  }),
  actions: {
    async fetchLogin(user: any) {
      return await userAPI.login(user)
    },
    async fetchGetUserinfo() {
      try {
        const result = await userAPI.getUserInfo()
        console.log(result)
        this.userinfo = result.data
      } catch (error) {
        console.log(error)
      }
    },
    async fetchChangeUserinfo(data: object) {
      try {
        return await userAPI.changeUserInfo(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})