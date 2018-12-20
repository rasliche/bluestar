const mongoose = require('mongoose')
const Joi = require('joi')

const shopSchema = new mongoose.Schema({
    // TODO: Shape data better (min lengths, max lengths)
    
    name: {
        type: String
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
            staff: [ mongoose.SchemaTypes.ObjectId ],
            conservationActivity: {
                name: String,
                description: String,
                date: Date
            }
        }
    ],
    managers: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
         }
    ],
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
        email: Joi.string(),
        phone: Joi.string(),
        website: Joi.string()
    }

    return Joi.validate(shop, schema)
}

const Shop = mongoose.model('Shop', shopSchema)

module.exports.Shop = Shop
module.exports.validate = validateShop