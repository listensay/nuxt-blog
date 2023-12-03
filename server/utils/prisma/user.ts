import { usePrisma } from '..'

/**
 * @description: 根据ID查询用户
 * @param id 用户ID
 * @returns 用户信息
 */
export const getUserById = async (id: number) => {
  const user = await usePrisma.user.findUnique({
    where: {
      id
    }
  })
  return user
}

/**
 * @description: 根据用户名查询用户
 * @param username 用户名
 * @returns User
 */
export const getUserByUsername = async (username: string) => {
  const user = await usePrisma.user.findUnique({
    where: {
      username
    }
  })
  return user
}

/**
 * @description: 根据邮箱查询用户
 * @param email
 * @returns User
 */
export const getUserByEmail = async (email: string) => {
  const user = await usePrisma.user.findUnique({
    where: {
      email
    }
  })
  return user
}

/**
 * @description: 创建用户
 * @param data 用户信息
 * @returns User
 */
export const createUser = async (data: any) => {
  const user = await usePrisma.user.create({
    data
  })
  return user
}

/**
 * @description: 更新用户信息
 * @param id 用户ID
 * @param data 用户信息
 */
export const updateUser = async (id: number, data: any) => {
  const user = await usePrisma.user.update({
    where: {
      id
    },
    data
  })
  return user
}
