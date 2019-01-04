const express = require('express')

const router = express.Router()

const usersController = require('../controllers/users')
const auth = require('../middleware/auth')

// GET /me
router.get('/me', auth, usersController.getMe)

// RESTful Routes
// GET /users
router.get('/', usersController.getUsers)

// // GET /users/new
// router.get('/new', usersController.getNewUser)

// GET /users/:userId/edit
router.get('/:userId/edit', usersController.getEditUser)

// GET /users/:userId
router.get('/:userId', usersController.getUser)

// DELETE /users/:userId/delete
router.post('/:userId/delete', usersController.deleteUser)

// POST /users/:userId
router.post('/:userId', usersController.postUpdateUser)

// // POST /users
// router.post('/', usersController.postUsers)

module.exports = router