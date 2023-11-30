export default defineEventHandler(async (_event) => {
  const body = await readBody(_event)
  const con = getDB()

  console.log(body)

  try {
    con.execute('', body)
  } catch (error) {
    console.log(error)
    return errorRes()
  } finally {
    con.end()
  }
})
