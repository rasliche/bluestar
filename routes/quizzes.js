const express = require('express')
const router = express.Router()

const quizzesController = require('../controllers/quizzes')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const canManage = require('../middleware/can-manage')

// RESTful Routes
// GET /quizzes
router.get('/', quizzesController.getQuizs)

// GET /quizzes/new
router.get('/new', quizzesController.getNewQuiz)

// GET /quizzes/:quizId/edit
router.get('/:quizId/edit', quizzesController.getEditQuiz)

// GET /quizzes/:quizId
router.get('/:quizId', quizzesController.getQuiz)

// DELETE /quizzes/:quizId/delete
router.post('/:quizId/delete', quizzesController.deleteQuiz)

// POST /quizzes/:quizId
router.post('/:quizId', quizzesController.postUpdateQuiz)

// POST /quizzes
router.post('/', quizzesController.postQuizs)

module.exports = router