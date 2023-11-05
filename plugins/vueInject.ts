// 防止使用v-html发生跨站脚本攻击XSS
import VueDOMPurifyHTML from 'vue-dompurify-html'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDOMPurifyHTML)
})
