const express = require('express')

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const adminController = require('../controllers/admin')

const router = express.Router()

// GET /admin
router.get('/', adminController.getAdminIndex)

module.exports = router