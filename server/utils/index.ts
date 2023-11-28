export const isLogin = (event: any) => {
  return event.context.auth ? event.context.auth.userinfo : 0
}
