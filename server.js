var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

app.use(express.static(__dirname + "/public"));
app.post('/register', upload.single('form__file'), function (req, res, next) {
  console.log(req, 'denchik');
  req.file.filename = req.file.originalname
  console.log(req.body, 'denchik');
})
 
app.listen(3000);