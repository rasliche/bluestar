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
const helmet = require('helmet')
const compression = require('compression')
const errorHandlers = require('./handlers/errorHandlers')

// configuration
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

// startup
const csrfProtection = csrf()

app.use(helmet())
app.use(compression())

const MONGODB_URI = config.get('db')

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: config.get('session_secret'),
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.use(csrfProtection)
app.use(flash())

app.use((req, res, next) => {
    res.locals.h = h
    res.locals.csrfToken = req.csrfToken()
    next()
})

console.log(`app: ${app.get('env')}`)
app.use(morgan('dev'))

app.use('/', routes)

app.use(errorHandlers.notFound)

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

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}.`))