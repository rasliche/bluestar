const express = require('express')
const router = express.Router()

const trainingController = require('../controllers/trainingController')

router.get('/', trainingController.homePage)

// // GET /training
// router.get('/', auth, (req, res, next) => {
//   res.render('training/index', {
//     pageTitle: 'Get Trained',
//     user: req.session.user
//   })
// })

// // GET /training/diving
// router.get('/diving', trainingController.getDivingCurriculum) // List all Diving modules

// // GET /training/fishing
// router.get('/fishing', trainingController.getFishingCurriculum) // List all Fishing modules

// GET /training/about-fknms
router.get('/about-fknms', trainingController.getAboutFKNMSModule)

// GET /training/about-blue-star
router.get('/about-blue-star', trainingController.getAboutBlueStarModule)

module.exports = router
