const express = require('express')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require("cookie-parser")
const expressFileUpload = require('express-fileupload')
const cloudinary = require("cloudinary");
const router = require('./routes/web')
const { client } = require('./config/mongodb')
const { sessionConf } = require('./config/sessionSet')

const app = express()

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(sessionConf)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/assets', express.static(__dirname + '/public'))
app.use(cookieParser())
var session;

app.use(expressFileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.use( (req, res, next) => {
  req.con = client
  next()
})

app.use('/', router)

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Server listening on port http://localhost:${process.env.PORT}`)
  }
})