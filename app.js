const mongoose = require('mongoose')
const config = require('config')
const morgan = require('morgan')
const session  = require('express-session')
const flash = require('connect-flash')
const MongoDBStore = require('connect-mongodb-session')(session)
const express = require('express')
const { User } = require('./models/user')

const MONGODB_URI = config.get('db')

const app = express()
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection:'sessions',
})

const helpers = require('./utilities/helpers')

const trainingRoutes = require('./routes/trainingRoutes')
const shopsRoutes = require('./routes/shopsRoutes')
const adminRoutes = require('./routes/adminRoutes')
const authRoutes = require('./routes/authRoutes')

// configuration
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

// Session management
app.use(session({
  secret: config.get('session_secret'),
  resave: false,
  saveUninitialized: false,
  store: store,
}))
app.use(flash())

app.use((req, res, next) => {
  // see if there is a user in the session
  // if not, keep going without looking one up
  if (!req.session.user) return next()

  // if yes, look up the user to get the mongoose model
  try {
    const user = User.findById(req.session.user._id)
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
})

// DEBUG
app.use((req, res, next) => {
  console.log(req.session)
  next()
})

// Stuff we want in every view
app.use((req, res, next) => {
  res.locals.h = helpers
  res.locals.currentPath = req.path
  res.locals.flashes = req.flash()
  next()
})

// Use our routes
app.use('/admin', adminRoutes)
app.use('/shops', shopsRoutes)
app.use('/training', trainingRoutes)
app.use(authRoutes)
app.use('/', (req, res, next) => {
  res.render(`index`, {
    pageTitle: "Home"
  })
})

// Catch-all route for 404 page not found (DOES NOT HANDLE ERRORS)
app.use((req, res, next) => {
  res.status(404).render('error', {
    pageTitle: "404"
  })
})

// startup
mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true
    })
    .then(console.log(`Connected to MongoDB at ${config.get('db')}`))
    .catch(err => console.log(err))

// Launch the app on port 3000 unless another is provided
const port = process.env.PORT || 3000
app.listen(port,
  () => console.log(`Listening on port ${port}.`))
