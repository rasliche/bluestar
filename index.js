const mongoose = require('mongoose')
const config = require('config')
const morgan = require('morgan')
const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const flash = require('connect-flash')
const h = require('./utilities/helpers')
const app = express()
const routes = require('./routes/index')

// configuration
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

// startup
const csrfProtection = csrf()

const { User } = require('./models/user')

const MONGODB_URI = config.get('db')

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

module.exports = function(app) {
    app.use(express.urlencoded({ extended: true }))
    app.use(session({
        secret: config.get('session_secret'),
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
            const user = await User.findById(req.session.user)
                .populate('shops', 'name')
                .select('-password')
            req.user = user
            next()
        } catch (err) {
            throw new Error(err)
        }
    })
    
    app.use((req, res, next) => {
        res.locals.h = h
        res.locals.csrfToken = req.csrfToken()
        // res.locals.loggedInUser = req.user || false
        next()
    })
    
    console.log(`app: ${app.get('env')}`)
    app.use(morgan('dev'))
    console.log('Morgan enabled...')

    app.use((req, res, next) => {
        console.log(req.session)
        next()
    })
}

app.use('/', routes)

async () => {
    try {
        await mongoose.connect(config.get('db'), {
            useNewUrlParser: true
        })
        console.log(`Connected to MongoDB at ${config.get('db')}`)
    } catch (err) {
        console.error(err)
    }
}

require('./startup/prod')(app)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}.`))