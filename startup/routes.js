const express = require('express')

const users = require('../routes/api/users')
const shops = require('../routes/api/shops')


const adminRoutes = require('../routes/admin')
const trainingRoutes = require('../routes/training')
const communityRoutes = require('../routes/community')
const authRoutes = require('../routes/auth')
const errorController = require('../controllers/error')

module.exports = function(app) {
    app.use(express.json())
    app.use('/api/users', users)
    app.use('/api/shops', shops)

    app.get('/', (req, res, next) => {
        res.render('index', {pageTitle: "Blue Star"})
    })
    app.use('/training', trainingRoutes)
    app.use('/admin', adminRoutes)
    app.use('/community', communityRoutes)
    app.use('/auth', authRoutes)
    app.use(errorController.get404)
    
    
}