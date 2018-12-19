const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')

// GET /auth/register
router.get('/register', authController.getRegister)

// GET /auth/register
router.post('/register', authController.postRegister)

// GET /auth/login
router.get('/login', authController.getLogin)

// GET /auth/login
router.post('/login', authController.postLogin)

module.exports = router