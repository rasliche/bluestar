const mongoose = require('mongoose')
const config = require('config')

module.exports = async function() {
    try {
        await mongoose.connect(config.get('db'), {
            useNewUrlParser: true
        })
        console.log(`Connected to MongoDB at ${config.get('db')}`)
    } catch (err) {
        console.error(err)
    }
}