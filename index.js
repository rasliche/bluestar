const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')


const app = express()

app.get('/', (req, res, next) => {
    res.send('Hello World')
})

const MONGODB_URI = `mongodb+srv://${config.get('dbConfig.MONGO_USER')}:${config.get('dbConfig.MONGO_PASSWORD')}@cluster0-tohwv.mongodb.net/${config.get('dbConfig.MONGO_DEFAULT_DB')}?retryWrites=true&w=majority`
mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(process.env.PORT || 3000)
    })
    .catch(err => {
        console.log(err)
    })
