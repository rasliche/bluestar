const express = require('express')
const router = express.Router()

const socialController = require('../controllers/socialController')

// GET /community/
router.get('/', socialController.getIndex) // Community Index (blog, calendar, connect)

// GET /community/calendar
router.get('/calendar', socialController.getCalendar)

// GET /community/connect
router.get('/connect')

// GET /community/blog
router.get('/blog', socialController.getBlog) // Blog Index

// GET /community/blog/:slug
router.get('/blog/:slug') // A Blog Post

module.exports = router
