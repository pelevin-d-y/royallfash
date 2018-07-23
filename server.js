const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const multerStorage = require('./server/multerStorage')
const userModel = require('./server/userModel')
// const fs = require('fs');

const app = express()
app.use(bodyParser.json())

app.use(express.static(__dirname + "/public"))
app.use("/uploads", express.static("uploads"))

mongoose.connect("mongodb://localhost:27017/users").then(() => {
  const mongooseUserModel = userModel()

  app.post('/register', multerStorage(), (req, res, next) => {
    let DbUser = mongooseUserModel ({
      name: req.body.form__surname,
      path: req.file.path,
      come: false
    })

    DbUser.save((err) => {
      if (err) throw err;
      console.log('User successfully saved.');
    })

    return res.send('success')
  })

  app.post('/exist', (req, res) => {
     return mongooseUserModel.find({ 'name': req.body.name }, (err, currentUserModel) => {
      if (err) return console.log(err)
      if (currentUserModel) {
        return res.send(
          { exist: 'exist', "currentUserModel": currentUserModel }
        )
      }
    })
  })

  app.post('/come', (req, res) => {
    return mongooseUserModel.update({ _id: req.body.name }, { $set: { come: true }}, (err, model) => {
      if (err) return console.log('update', err)
      return res.send(model)
    })
  })

  app.get('/fullnames', (req, res) => {
    return mongooseUserModel.find({}, (err, currentUserModel) => {
      // fs.writeFile("uploads/hello.txt", currentUserModel)
      res.send(currentUserModel)
    })
  })

});

app.listen(8080)