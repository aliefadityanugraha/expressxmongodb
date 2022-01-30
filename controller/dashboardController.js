const Admin = require('../model/Dashboard');

module.exports = {
  dashboard: (req, res) => {
    Admin.readCollectionByUser(req.con, req.session.userid, (err, result) => {
      res.render('main/dashboard', {
        title: 'Data Artikel',
        layout: 'layouts/main-layouts',
        data: result,
        authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
        authUserAdmin: req.session.userid,
        url_app: process.env.URL_ROOT
      })
    })
  },
}