const multer = require('multer')
const crypto = require('crypto')

const multerStorage = () => {
  const multer = require('multer')

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return console.log(err)
        }
        const filename = buf.toString('hex')

        cb(null, filename + file.originalname)
      })
    }
  })

  const upload = multer({ storage: storage })

return upload.single('form__file');
}

module.exports = multerStorage