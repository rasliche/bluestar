const express = require('express')
const router = express.Router()

// GET /community/
router.get('/') // Community Index (blog, calendar, connect)

// GET /community/calendar
router.get('/calendar')

// GET /community/connect
router.get('/connect')

// GET /community/blog
router.get('/blog') // Blog Index

// GET /community/blog/:slug
router.get('/blog/:slug') // A Blog Post

module.exports = router
