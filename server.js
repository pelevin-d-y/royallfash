const express = require("express")
const path = require('path')
const multer = require('multer')
const mongoClient = require("mongodb").MongoClient
const mongoose = require('mongoose')
const crypto = require('crypto')

var app = express()

app.use(express.static(__dirname + "/public"));


let getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

mongoose.connect("mongodb://localhost:27017/users").then(client => {
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

  const sUpload = upload.single('form__file');

  let userSchema = mongoose.Schema({
    name: String,
    path: String
  })

  let User = mongoose.model('User', userSchema)

  app.post('/register', sUpload, (req, res, next) => {
    let DbUser = new User ({
      name: req.body.form__surname,
      path: req.file.path
    })

    DbUser.save((err) => {
      if (err) throw err;
      console.log('User successfully saved.');
    })
  })
});



// mongo
// mongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true }, function(err, client){
//   const db = client.db("usersdb");
//   const collection = db.collection("users");
//   let user = {name: "Tom", age: 23};

//   collection.insertOne(user, function(err, result) {

//   });
// });



app.listen(3000);