const express = require('express')
const router = express.Router()

router.get('/uses', (req, res, next) => {
    res.send("Developer uses page")
})

module.exports = router