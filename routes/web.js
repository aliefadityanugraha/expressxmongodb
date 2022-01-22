const express = require('express')
const router = express.Router()

const mainController = require('../controller/mainController')
const authController = require('../controller/authController')
const accountController = require('../controller/accountController')
const adminController = require('../controller/adminController.js')
const reportController = require('../controller/reportController')
const searchCotroller = require('../controller/searchController')
const errorController = require('../controller/errorController')

const {authUser, accountAcces, adminPageAccess} = require('../middleware/authMiddleware')

router.get('/', mainController.home)
router.get('/page/:page', mainController.home)
router.get('/read/:slug', mainController.read)
router.get('/about', mainController.about)
router.get('/report', reportController.report)
router.post('/report', reportController.storeReport)
router.post('/search', searchCotroller.search)

router.get('/register', authController.register)
router.post('/register', authController.store)
router.get('/login', authController.login)
router.post('/login', authController.authentication)
router.get('/logout', authController.logout)

router.get('/dashboard',authUser,adminPageAccess('adminAccount'), adminController.dashboard)
router.get('/data-artikel',authUser,adminPageAccess('adminAccount'), adminController.dataArtikel)
// router.get('/data-user',authUser,adminPageAccess('adminAccount'), adminController.dataUser)
router.get('/create',authUser,adminPageAccess('adminAccount'), adminController.createView)
router.post('/create',authUser,adminPageAccess('adminAccount'), adminController.insertArticle)

router.get('/update/:slug',authUser,adminPageAccess('adminAccount'), adminController.updateView)
router.put('/update/:slug',authUser,adminPageAccess('adminAccount'), adminController.updateArticle)

router.delete('/delete/:slug',authUser,adminPageAccess('adminAccount'), adminController.deleteArticle)

router.get('/account/:account',authUser, accountAcces, mainController.account)
router.put('/account/:account', authUser, accountController.updatePassword)
router.delete('/account/:account', authUser, accountController.deleteAccount)
router.post('/account/:account', authUser, accountController.saveDataUser)

// always in last
router.get('/*', errorController.error404)

module.exports = router;