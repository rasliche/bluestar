const express = require('express')

const adminRoutes = require('../routes/admin')
const usersRoutes = require('../routes/users')
const shopsRoutes = require('../routes/shops')
const trainingRoutes = require('../routes/training')
const communityRoutes = require('../routes/community')
const authRoutes = require('../routes/auth')
const errorController = require('../controllers/error')

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

module.exports = function(app) {
    app.get('/', (req, res, next) => {
        res.render('index', {
            pageTitle: "Blue Star",
        })
    })

    app.use('/', usersRoutes)
    app.use('/shops', shopsRoutes)
    app.use('/training', trainingRoutes)
    app.use('/admin', [auth, admin], adminRoutes)
    app.use('/community', communityRoutes)
    app.use(authRoutes)
    app.use(errorController.get404)
    
    
}