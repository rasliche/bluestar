const express = require('express')
const router = express.Router()

const communityController = require('../controllers/community')

// GET /community/
router.get('/', communityController.getIndex) // Community Index (blog, calendar, connect)

// GET /community/calendar
router.get('/calendar', communityController.getCalendar)

// GET /community/connect
router.get('/connect')

// GET /community/blog
router.get('/blog', communityController.getBlog) // Blog Index

// GET /community/blog/:slug
router.get('/blog/:slug') // A Blog Post

module.exports = router
