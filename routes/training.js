const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')
const trainingController = require('../controllers/training')

// GET /training
router.get('/', (req, res, next) => {
    res.render('training/index', {
        pageTitle: "Training",
        loggedIn: req.session.loggedIn
    })
})

// GET /training/diving
router.get('/diving', trainingController.getDivingCurriculum) // List all Diving modules

// GET /training/fishing
router.get('/fishing', trainingController.getFishingCurriculum) // List all Fishing modules

// GET /training/about-blue-star
router.get('/:moduleName', trainingController.getTrainingModule)

module.exports = router