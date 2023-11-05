import { useUserAPI } from "~/service/module/user"
import { ElMessage } from 'element-plus'

const userAPI = useUserAPI()

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    userinfo: '',
    isLogin: useCookie('accessToken'),
    token: ''
  }),
  actions: {
    async fetchLogin(user: any) {
      return await userAPI.login(user)
    }
  }
})