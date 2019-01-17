const mongoose = require('mongoose')
const Joi = require('joi')

const User = require('./user')

const shopSchema = new mongoose.Schema({
    // TODO: Shape data better (min lengths, max lengths)
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    records: [
        { 
            year: Number,
            isComplete: Boolean,
            conservationActivity: {
                name: String,
                description: String,
                date: Date
            }
        }
    ],
    staff: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        } 
    ],
    managers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    isActive: {
        type: Boolean,
        default: false
    },
    region: {
        type: String,
        enum: [ 'upper', 'middle', 'lower', 'keywest']
    },
    website: {
        type: String
    }
})

function validateShop(shop) {
    const schema = {
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string(),
        phone: Joi.string(),
        website: Joi.string()
    }

    return Joi.validate(shop, schema)
}

const Shop = mongoose.model('Shop', shopSchema)

module.exports.Shop = Shop
module.exports.validateShop = validateShop