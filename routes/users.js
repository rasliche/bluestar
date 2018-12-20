const express = require('express')

const router = express.Router()

const usersController = require('../controllers/users')

// GET /me
router.get('/me', usersController.getMe)

module.exports = router