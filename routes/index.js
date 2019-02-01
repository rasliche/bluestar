const express = require('express')
const router = express.Router()

const trainingController = require('../controllers/trainingController')
const adminController = require('../controllers/adminController')

router.get('/', trainingController.homePage)

router.get('/admin', adminController.homePage)
router.get('/admin/shop/add', adminController.addShop)
router.get('/admin/shop/add', adminController.addShop)

module.exports = router