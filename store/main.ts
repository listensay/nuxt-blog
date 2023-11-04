import { useMainAPI } from '~/service/main'
const manAPI = useMainAPI()

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    seo: ''
  }),
  actions: {
    async fetchGetWebOptions() {
      try {
        const result = await manAPI.getWebOptions()
        this.seo = JSON.parse(result.data.seo)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
