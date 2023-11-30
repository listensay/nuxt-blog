import fs from 'fs'
import path from 'path'
import multer from 'multer'

let filePath = '' // 用于保存文件路径
const uploadDir = './public/images' // 文件存储目录

// 检查目录是否存在，如果不存在则创建它
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// 上传文件配置
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir)
  },
  filename: function (_req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname)
    filePath = '/images/' + filename // 只包含/images/目录和文件名
    cb(null, filename)
  }
})

const upload = multer({ storage })

export default defineEventHandler(async (event) => {
  const login = isLogin(event)

  if (login === 0) {
    setResponseStatus(event, 401)
    return errorRes('请登录')
  }

  await new Promise<void>((resolve, reject) => {
    upload.single('images')(
      event.node.req as any,
      event.node.res as any,
      (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
  return successRes(filePath, '上传成功')
})
