const express = require('express')
const router = express.Router()

const trainingController = require('../controllers/trainingController')
const adminController = require('../controllers/adminController')

router.get('/', trainingController.homePage)
router.get('/add', trainingController.addLesson)

router.get('/admin', adminController.homePage)

module.exports = router