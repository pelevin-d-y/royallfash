const mongoose = require('mongoose')

const userModel = () => {
  let userSchema = mongoose.Schema({
    name: String,
    path: String,
    come: Boolean
  })

  return mongoose.model('User', userSchema)
}
module.exports = userModel