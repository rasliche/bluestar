const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

// GET /admin
router.get('/', adminController.getAdminIndex)

// GET /admin/shops
router.get('/shops')

// GET /admin/users
router.get('/users')

// GET /admin/add-shop
router.get('/add-shop', adminController.getAddShop)

// POST /admin/add-shop
router.post('/add-shop', adminController.postAddShop)

// GET /admin/add-user
router.get('/add-user', adminController.getAddUser)

// POST /admin/add-shop
router.post('/add-user', adminController.postAddUser)

module.exports = router