const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const MONGODB_URI = config.get('db')

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

module.exports = function(app) {
    app.use(helmet())
    app.use(express.urlencoded({ extended: true }))
    app.use(session({
        secret: config.get('session-secret'),
        resave: false,
        saveUninitialized: false,
        store: store
    }))
    
    if (app.get('env') === 'development') {
        console.log(`app: ${app.get('env')}`)
        app.use(morgan('dev'))
        console.log('Morgan enabled...')

        app.use((req, res, next) => {
            console.log(req.session)
            next()
        })
    }
}