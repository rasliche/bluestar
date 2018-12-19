const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const session = require('express-session')

module.exports = function(app) {
    app.use(helmet())
    app.use(session({
        secret: config.get('session-secret'),
        resave: false,
        saveUninitialized: false
    }))
    
    if (app.get('env') === 'development') {
        console.log(`app: ${app.get('env')}`)
        app.use(morgan('dev'))
        console.log('Morgan enabled...')
    }
}