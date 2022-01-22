const mainModel = require('../model/Main');
const authModel = require('../model/Auth');

module.exports = {
  home: (req, res) => {
    mainModel.readCollection(req.con, (err, result) => {
        const jumlahDataPerHalaman = 5;
        const jumlahdataArtikel = result.length;
        const jumlahHalaman = Math.ceil(jumlahdataArtikel / jumlahDataPerHalaman);
  
        const halamanActive = typeof req.params.page === 'undefined' ? 1 : req.params.page;
  
        const dataAwal = (jumlahDataPerHalaman * halamanActive) - jumlahDataPerHalaman;
  
        mainModel.readCollectionWithLimitDocumment(req.con, jumlahDataPerHalaman, dataAwal, (err, result) => {
          res.render('main/home', {
            result,
            layout: 'layouts/main-layouts',
            jumlahHalaman: jumlahHalaman,
            halamanActive: halamanActive,
            jumlahdataArtikel: jumlahdataArtikel,
            authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
            url_app: process.env.URL_ROOT
          });
        });
        
      });
  },
  read: function(req, res) {
    mainModel.readOneDocument(req.con, req.params.slug, (err, result) => {
      res.render('main/read', {
        data: result,
        layout: 'layouts/main-layouts',
        authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
        url_app: process.env.URL_ROOT
      })
    })
  },
  account: function(req, res) {
    authModel.getAccountByEmail(req.con, req.session.userid, (err, result) => {
      res.render('main/account', {
        data: result,
        dataUser: result.data,
        layout: 'layouts/main-layouts',
        authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
        url_app: process.env.URL_ROOT
      })
    })
  },
  about: function(req, res) {
    res.render('main/about', {
      layout: 'layouts/main-layouts',
      authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
      url_app: process.env.URL_ROOT
    })
  },
  report: function(req, res) {
    res.render('main/report', {
      layout: 'layouts/main-layouts',
      authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
      url_app: process.env.URL_ROOT
    })
  }
}