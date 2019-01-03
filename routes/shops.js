const express = require('express')
const router = express.Router()

const shopsController = require('../controllers/shops')

// GET /shops
router.get('/', shopsController.getShops)

// GET /shops/:shopId
router.get('/:shopId', shopsController.getShop)

// GET /shops/new
router.get('/new', shopsController.getNewShop)

// POST /shops
router.post('/', shopsController.postShops)

// GET /shops/:shopId/edit
router.get('/:shopId/edit')

// PUT /shops/:shopId
router.put('/:shopId')

// DELETE /shops/:shopId/delete
router.delete('/:shopId/delete')

module.exports = router