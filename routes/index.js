const express = require('express');
const router = express.Router();

const trainingController = require('../controllers/trainingController')
const adminController = require('../controllers/adminController')

// Do work here
router.get('/', trainingController.homePage)
router.get('/admin', adminController.homePage)

module.exports = router;
