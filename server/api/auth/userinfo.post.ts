export default defineEventHandler(async (_event) => {
  const body = await readBody(_event)
  // const con = getDB()

  try {
    // con.execute('', body)
    let userinfo =  _event.context.auth ? _event.context.auth.userinfo : 0
    
    console.log('userinfo', userinfo)
    return successRes(userinfo)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error)
    return errorRes()
  } finally {
    // con.end()
  }
})
