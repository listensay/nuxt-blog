import { loadEnv } from 'vite'

const envScript = process?.env?.npm_lifecycle_script?.split(' ')
const envName = envScript?.[envScript.length - 1] || ''
const envData = loadEnv(envName, 'env') as any

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-primevue',
    'dayjs-nuxt',
    '@ant-design-vue/nuxt'
  ],
  runtimeConfig: {
    tokenSecret: process.env.TOKEN_SECRET,
    public: {
      baseUrl: envData.VITE_BASE_URL
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true
  },
  css: [
    '@/assets/css/index.less',
    'primevue/resources/themes/lara-light-green/theme.css'
  ],
  devServer: {
    port: 9088
  }
})