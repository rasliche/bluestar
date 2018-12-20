const mongoose = require('mongoose')
const Joi = require('joi')

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
    shops: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Shop'
        }
    ],
    isAdmin: {
        type:Boolean,
        default: false
    },
    // Is this the best way to model the relationship?
    isManager: [ 
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Shop'
        }
    ]
})

function validateUser(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().required()
    }
    return Joi.validate(user, schema)
}

const User = mongoose.model('User', userSchema)

module.exports.User = User
module.exports.validateUser = validateUser