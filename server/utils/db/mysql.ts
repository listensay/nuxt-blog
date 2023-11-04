import mysql from 'mysql2'

export const getDB = () => {
  return mysql
    .createPool({
      // 数据库地址
      host: '127.0.0.1',
      // 数据库账号
      user: 'root',
      // 数据库密码
      password: '123456',
      // 数据库名称
      database: 'listen_blog',
      waitForConnections: true
    })
    .promise()
}
