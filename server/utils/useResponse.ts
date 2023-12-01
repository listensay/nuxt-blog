export const successRes = (data: any, message: String = 'ok') => {
  return {
    code: 200,
    data,
    message,
    success: true
  }
}

export const errorRes = (message: String = '服务器错误', code: number) => {
  return {
    code,
    message,
    success: false
  }
}
