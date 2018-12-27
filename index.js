const config = require('config')
const express = require('express')
const app = express()

// configuration
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

// console.log('Application Name: ' + config.get('name'))

// app.use((req, res, next) => {
    //     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     next()
// })

// startup
require('./startup/db')()
require('./startup/middleware')(app)
require('./startup/routes')(app)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}.`))