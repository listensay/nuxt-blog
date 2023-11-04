import { hash } from 'ohash'

export const useRequest = async (url: any, options?: any, headers?: any) => {
  try {
    const config = useRuntimeConfig() // 3.0正式版环境变量要从useRuntimeConfig里的public拿
    const reqUrl = config.public.baseUrl + url // 你的接口地址
    // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
    const key = hash(options + url + Date.now())

    // 可以设置默认headers例如
    const customHeaders = { token: useCookie('token').value, ...headers }

    const { data } = await useFetch(reqUrl, {
      ...options,
      key,
      headers: customHeaders
    })

    const result = data.value as any

    return result
  } catch (err) {
    return Promise.reject(err)
  }
}
