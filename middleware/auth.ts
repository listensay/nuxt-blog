export default defineNuxtRouteMiddleware((to, from) => {
  // 未登录
  const token = useCookie("accessToken");
  if (!token.value) {
    if (process.client) {
      ElMessage.error('请先登录')
    }
    return navigateTo('/login?from=' + to.fullPath)
  }
})
