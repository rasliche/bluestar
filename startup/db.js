const mongoose = require('mongoose')
const config = require('config')

module.exports = function() {
    mongoose.connect(config.get('db'), {
        useNewUrlParser: true
    })
        .then(result => {
            console.log(`Connected to MongoDB at ${config.get('db')}`)
        })
        .catch(err => console.error(err))
}