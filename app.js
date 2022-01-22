const express = require('express')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require("cookie-parser")
const router = require('./routes/web')
const { client } = require('./config/mongodb')
const { sessionConf } = require('./config/sessionSet')

const app = express()
const port = 3030

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(sessionConf)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/assets', express.static(__dirname + '/public'))
app.use(cookieParser())
var session;

app.use( (req, res, next) => {
  req.con = client
  next()
})

app.use('/', router)

app.listen(process.env.PORT || process.env.APP_PORT, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Server listening on port http://localhost:${port}`)
  }
})