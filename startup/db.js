const mongoose = require('mongoose')
const config = require('config')

module.exports = function() {
    mongoose.connect(process.env.db, {
        useNewUrlParser: true
    })
        .then(result => {
            console.log(`Connected to MongoDB at ${process.env.db}`)
        })
        .catch(err => console.error(err))
}