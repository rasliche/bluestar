const express = require('express')
const router = express.Router()

const shopsController = require('../controllers/shops')

// RESTful Routes
// GET /shops
router.get('/', shopsController.getShops)

// GET /shops/new
router.get('/new', shopsController.getNewShop)

// GET /shops/:shopId/edit
router.get('/:shopId/edit', shopsController.getEditShop)

// GET /shops/:shopId
router.get('/:shopId', shopsController.getShop)

// DELETE /shops/:shopId/delete
router.post('/:shopId/delete', shopsController.deleteShop)

// POST /shops/:shopId
router.post('/:shopId', shopsController.postUpdateShop)

// POST /shops
router.post('/', shopsController.postShops)

module.exports = router