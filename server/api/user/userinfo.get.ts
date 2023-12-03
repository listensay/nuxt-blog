import { isLogin } from '~/server/utils'

export default defineEventHandler(async (event) => {
  try {
    const uid = isLogin(event)
    if (uid === 0) {
      setResponseStatus(event, 401)
      return errorRes('请登录', 401)
    }

    const user = await getUserById(uid)
    if (!user) {
      setResponseStatus(event, 400)
      return errorRes('用户不存在', 400)
    }

    return successRes(user)
  } catch (error) {
    console.log('error ===== ', error)
    setResponseStatus(event, 500)
    return errorRes('服务器错误', 500)
  }
})
