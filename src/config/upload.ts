import path from 'path'
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'

interface IUploadConfig {
  multer: {
    storage: StorageEngine
  }
}

export default {
  multer: {
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', '..', 'temp'))
      },
      filename: (_, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      },
    }),
    // limits: {
    //   fileSize: 30 * 1024 * 1024, // 30 MB
    // },
  },
} as IUploadConfig
