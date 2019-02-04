const config = require('config')
const morgan = require('morgan')
const express = require('express')
const app = express()
// const routes = require('./routes/index')
const errorController = require('./controllers/errorController')
const helpers = require('./helpers')

// configuration
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

if (app.get('env') === 'development') {
    app.use(morgan('dev'))
}

// startup
require('./startup/middleware')(app)
require('./startup/db')()
require('./startup/routes')(app)

app.use((req, res, next) => {
    // res.locals.csrfToken = req.csrfToken()
    res.locals.h = helpers
    res.locals.user = req.user || null
    next()
})

// Use our routes
// app.use(routes)
app.use(errorController.catchErrors)

const port = process.env.PORT || 3000
app.listen(port, 
    () => console.log(`Listening on port ${port}.`))