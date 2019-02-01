const config = require('config')
const express = require('express')
const app = express()
const routes = require('./routes/index')
const errorController = require('./controllers/errorController')

// configuration
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

// Use our routes
app.use(routes)
app.use(errorController.catchErrors)

// startup
require('./startup/logging')()
require('./startup/middleware')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/prod')(app)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}.`))