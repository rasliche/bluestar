const express = require('express')

const router = express.Router()

const usersController = require('../controllers/users')
const auth = require('../middleware/auth')

// GET /me
router.get('/me', auth, usersController.getMe)

module.exports = router