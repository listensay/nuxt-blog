import { isLogin } from "~/server/utils"

export default defineEventHandler(async (event) => {

  try {

    const userinfo = isLogin(event)

    if(userinfo === 0) {
      setResponseStatus(event ,401)
      return errorRes('请登录')
    }

    console.log(userinfo)
    return successRes(userinfo)

  } catch (error) {
    console.log('error', error)
    return errorRes()
  }

})
