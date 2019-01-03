const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')
const trainingController = require('../controllers/training')

const auth = require('../middleware/auth')

// GET /training
router.get('/', auth, (req, res, next) => {
    res.render('training/index', {
        pageTitle: "Get Trained",
        user: req.session.user
    })
})

// GET /training/diving
router.get('/diving', trainingController.getDivingCurriculum) // List all Diving modules

// GET /training/fishing
router.get('/fishing', trainingController.getFishingCurriculum) // List all Fishing modules

// GET /training/about-blue-star
router.get('/:moduleName', trainingController.getTrainingModule)

module.exports = router