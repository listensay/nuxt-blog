import { getDB } from '~/server/utils/db/mysql'
import { errorRes, successRes } from '~/server/utils/useResponse'
export default defineEventHandler(async (_event) => {
  const con = getDB()
  try {
    const [seo] = <any>await con.query('select seo from listen_options')
    await con.end()
    if (seo.length > 0) {
      return successRes(seo[0])
    } else {
      return errorRes()
    }
  } catch (error) {
    await con.end()
    console.log(error)
    return errorRes()
  }
})
