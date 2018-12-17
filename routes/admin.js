const express = require('express')

const shopsController = require('../controllers/shops')
const usersController = require('../controllers/users')
const adminController = require('../controllers/admin')

const router = express.Router()

// GET /admin
router.get('/', adminController.getAdminIndex)

// GET /admin/shops
router.get('/shops')

// GET /admin/users
router.get('/users')

// GET /admin/add-shop
router.get('/add-shop', shopsController.getAddShop)

// GET /admin/add-user
router.get('/add-user', usersController.getAddUser)

// POST /admin/add-shop
router.post('/add-shop', shopsController.postShops)

module.exports = router