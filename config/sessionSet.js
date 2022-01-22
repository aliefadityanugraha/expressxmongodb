const sessions = require('express-session')

const oneDay = 1000 * 60 * 60 * 24

const sessionConf = sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
})

module.exports = {
  sessionConf
}