import { isLogin } from '~/server/utils'

export default defineEventHandler(async (event) => {
  try {
    const userinfo = isLogin(event)
    const con = getDB()

    if (userinfo === 0) {
      setResponseStatus(event, 401)
      return errorRes('请登录')
    }

    try {
      const [row] = <any>(
        await con.execute('select * from listen_users where user_id = ?', [
          userinfo.user_id
        ])
      )

      return successRes({
        username: row[0].username,
        nickname: row[0].nickname,
        profile: row[0].profile,
        email: row[0].email,
        avatar: row[0].avatar,
        desc: row[0].desc,
        create_time: row[0].create_time
      })
    } catch (error) {}
  } catch (error) {
    console.log('error', error)
    setResponseStatus(event, 500)
    return errorRes()
  }
})
