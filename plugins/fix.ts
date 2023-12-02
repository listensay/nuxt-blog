export default defineNuxtPlugin({
  name: 'router',
  hooks: {
    'page:start': function () {
      const nuxtApp = useNuxtApp()
      nuxtApp.$router.running = false
      nuxtApp.$router.beforeEach((to, _from, next) => {
        if (nuxtApp.$router.running) {
          next(true)
        } else {
          nuxtApp.$router.nextRoute = to.fullPath
          next(false)
        }
      })
    },
    'page:transition:finish': function () {
      const nuxtApp = useNuxtApp()
      nuxtApp.$router.running = true
      if (nuxtApp.$router.nextRoute) {
        nuxtApp.$router.push(nuxtApp.$router.nextRoute)
        nuxtApp.$router.nextRoute = null
      }
    }
  }
})
