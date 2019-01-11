const config = require('config')
const morgan = require('morgan')
const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const flash = require('connect-flash')

const csrfProtection = csrf()

const { User } = require('../models/user')

const MONGODB_URI = process.env.db

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

module.exports = function(app) {
    app.use(express.urlencoded({ extended: true }))
    app.use(session({
        secret: config.get('session-secret'),
        resave: false,
        saveUninitialized: false,
        store: store
    }))

    app.use(csrfProtection)
    app.use(flash())
    
    app.use(async (req, res, next) => {
        try {
            if (!req.session.user) return next()
            // Find the current logged in user
            const user = await User.findById(req.session.user._id)
    
            if (!user) return next()
            req.user = user
            next()
        } catch (err) {
            throw new Error(err)
        }
    })
    
    app.use((req, res, next) => {
        res.locals.csrfToken = req.csrfToken()
        res.locals.loggedInUser = req.session.user
        next()
    })
    
    // if (app.get('env') === 'development') {
        console.log(`app: ${app.get('env')}`)
        app.use(morgan('dev'))
        console.log('Morgan enabled...')

        app.use((req, res, next) => {
            console.log(req.session)
            next()
        })
    // }
}