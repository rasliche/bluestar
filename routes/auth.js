const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')

// GET /training/register
router.get('/register', authController.getRegister)

// GET /training/login
router.get('/login', authController.getLogin)

module.exports = router