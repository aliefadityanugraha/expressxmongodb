const crypto = require('crypto')
const AccountModel = require('../model/Account')

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

module.exports = {

  updatePassword: function(req, res) {

    const hashedPasswordOld = getHashedPassword(req.body.oldPassword)
    const hashedPasswordNew = getHashedPassword(req.body.newPassword)

    AccountModel.getAccountByEmail(req.con, req.params.account, (err, rows) => {
      if(err) throw err
      if(hashedPasswordOld === rows.password) {
        AccountModel.updateAccountPassword(req.con, hashedPasswordNew, req.params.account, (err, rows) => {
          if(err) throw err
          res.redirect(`/account/${req.params.account}`)
        })
      } else {
        res.redirect(`/account/${req.params.account}`)
      }
    })
  },

  deleteAccount: function(req, res) {
    AccountModel.deleteAccount(req.con, req.params.account, (err, rows) => {
      if(err) throw err
      req.session.destroy()
      res.redirect('/')
    })
  },

  saveDataUser: function(req, res) {
    AccountModel.saveAccountData(req.con, req.body, req.params.account, (err, result) => {
      if(err) throw err
      res.redirect(`/account/${req.params.account}`)
    })
  }
}