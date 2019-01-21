const express = require('express')
const router = express.Router()

const shopsController = require('../controllers/shops')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const canManage = require('../middleware/can-manage')

// RESTful Routes
// GET /shops
router.get('/', shopsController.getShops)

// GET /shops/new
router.get('/new', [auth, admin], shopsController.getNewShop)

// GET /shops/:shopId/edit
router.get('/:shopId/edit', [auth, canManage], shopsController.getEditShop)

// POST /shops/:shopId/make-manager/:userId
router.post('/:shopId/add-manager/:userId', [auth, canManage], shopsController.postAddManager)

// GET /shops/:shopId
router.get('/:shopId', shopsController.getShop)

// DELETE /shops/:shopId/delete
router.post('/:shopId/delete', [auth, admin], shopsController.deleteShop)

// POST /shops/:shopId
router.post('/:shopId', [auth, admin], shopsController.postUpdateShop)

// POST /shops
router.post('/', [auth, admin], shopsController.postShops)

module.exports = router