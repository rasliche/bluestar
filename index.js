const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()
app.use(helmet())

// configuration
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

console.log('Application Name: ' + config.get('name'))

if (app.get('env') === 'development') {
    console.log(`app: ${app.get('env')}`)
    app.use(morgan('dev'))
    console.log('Morgan enabled...')
}

// startup
require('./startup/routes')(app)
require('./startup/db')()

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}.`))