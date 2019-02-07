const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

// GET /register
router.get('/register', authController.getRegister)

// POST /register
router.post('/register', authController.postRegister)

// GET /login
router.get('/login', authController.getLogin)

// POST /login
router.post('/login', authController.postLogin)

// POST /logout
router.post('/logout', authController.postLogout)

// POST /reset
router.post('/reset', authController.postReset)

// GET /reset/:resetToken
router.get('/reset/:resetToken', authController.getPasswordResetWithToken)

// POST /new-password
router.post('/new-password', authController.postPasswordResetWithToken)

module.exports = router
