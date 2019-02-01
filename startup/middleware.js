const config = require('config')
const morgan = require('morgan')
const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const flash = require('connect-flash')
const helpers = require('../helpers')

const csrfProtection = csrf()

const { User } = require('../models/user')

const MONGODB_URI = config.get('db')

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

module.exports = function(app) {
    app.use(express.urlencoded({ extended: true }))
    // app.use(session({
    //     secret: config.get('session_secret'),
    //     resave: false,
    //     saveUninitialized: false,
    //     store: store
    // }))
    // app.use(csrfProtection)
    app.use(flash())
    
    // app.use(async (req, res, next) => {
    //     try {
    //         if (!req.session.user) return next()
    //         // Find the current logged in user
    //         const user = await User.findById(req.session.user)
    //             .populate('shops', 'name')
    //             .select('-password')
    //         req.user = user
    //         next()
    //     } catch (err) {
    //         throw new Error(err)
    //     }
    // })
}