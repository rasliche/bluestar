const express = require('express')
const router = express.Router()

const shopsController = require('../controllers/shops')

// GET /shops
router.get('/', shopsController.getShops)

// POST /shops
router.post('/', shopsController.postShops)

// GET /shops/new
router.get('/new', shopsController.getNewShop)

// GET /shops/:id
router.get('/:shopId', shopsController.getShop)

module.exports = router