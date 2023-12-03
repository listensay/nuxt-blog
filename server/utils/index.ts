import { PrismaClient } from '@prisma/client'

/**
 * @description: 判断是否登录
 * @param {any} event
 * @return {number}
 */
export const isLogin = (event: any) => {
  return event.context.auth ? event.context.auth.userinfo : 0
}

/**
 * @description: PrismaClient
 */
export const usePrisma = new PrismaClient()
