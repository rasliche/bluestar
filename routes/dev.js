const express = require('express')
const router = express.Router()

router.get('/uses', (req, res, next) => {
    res.render('dev/uses')
})

router.get('/', (req, res, next) => {
    res.render('dev/index')
})

module.exports = router