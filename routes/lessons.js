const express = require('express')
const router = express.Router()

const lessonsController = require('../controllers/lessons')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const canManage = require('../middleware/can-manage')

// RESTful Routes
// GET /lessons
router.get('/', lessonsController.getLessons)

// GET /lessons/new
router.get('/new', lessonsController.getNewLesson)

// GET /lessons/:lessonId/edit
router.get('/:lessonId/edit', lessonsController.getEditLesson)

// GET /lessons/:lessonId/quiz
router.get('/:lessonId/quiz', lessonsController.getLessonQuiz)

// GET /lessons/:lessonId
router.get('/:lessonId', lessonsController.getLesson)

// DELETE /lessons/:lessonId/delete
router.post('/:lessonId/delete', [auth, admin], lessonsController.deleteLesson)

// POST /lessons/:lessonId
router.post('/:lessonId', [auth, admin], lessonsController.postUpdateLesson)

// POST /lessons
router.post('/', [auth, admin], lessonsController.postLessons)

module.exports = router