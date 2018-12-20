const express = require('express')

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const adminController = require('../controllers/admin')

const router = express.Router()

// GET /admin
router.get('/', adminController.getAdminIndex)

// GET /admin/add-shop
router.get('/add-shop', adminController.getAddShop)

// POST /admin/add-shop
router.post('/add-shop', adminController.postAddShop)

// GET /admin/add-user
router.get('/add-user', adminController.getAddUser)

// POST /admin/add-shop
router.post('/add-user', adminController.postAddUser)

module.exports = router