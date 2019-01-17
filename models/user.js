const mongoose = require('mongoose')
const Joi = require('joi')
const _ = require('lodash')

const Shop = require('./shop')

const userSchema = new mongoose.Schema({
    // TODO: Shape data better (min lengths, max lengths)
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        min: 5,
        max: 255,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    records: [
        // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
        { 
            year: Number,
            isComplete: Boolean,
            modules: [
                {
                    name: String,
                    score: Number,
                    date: Date
                }
            ],
            continuingEducation: {
                name: String,
                description: String,
                date: Date
            }
        }
    ],
    shops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    // Is this the best way to model the relationship?
    isManager: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shop'
        }
    ]
})

userSchema.methods.joinShop = function(newShopId) {
    // Validate Shop Here
    const shopInUser = _.includes(this.shops, newShopId)
    if (!shopInUser) { this.shops.push(newShopId) }
    return this.save()
}

userSchema.methods.makeManager = function(newShopId) {
    // Validate Shop Here
    const shopInUser = _.includes(this.shops, newShopId)
    const isAlreadyManager = _.includes(this.isManager, newShopId)
    if (!shopInUser) this.shops.push(newShopId)
    if (!isAlreadyManager) this.isManager.push(newShopId)
    return this.save()
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().required()
    }
    return Joi.validate(user, schema)
}

module.exports.User = User
module.exports.validateUser = validateUser