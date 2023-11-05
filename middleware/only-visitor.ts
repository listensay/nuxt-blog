export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("accessToken");
  //已登录，强制重定向到首页
  console.log('only', token)
  if (token.value) {
    if (process.client) {
      ElMessage.error('已经登录过了！！ [○･｀Д´･ ○]')
    }
    console.log(to, from)
    return '/';
  }
})
