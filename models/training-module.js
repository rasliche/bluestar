const mongoose = require('mongoose')
const Joi = require('joi')

const trainingModuleSchema = new mongoose.Schema({
    // TODO: Shape data better (min lengths, max lengths)
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    editedDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
})

function validateModule(trainingModule) {
    const schema = {
        
    }

    return Joi.validate(trainingModule, schema)
}

const TrainingModule = mongoose.model('TrainingModule', trainingModuleSchema)

module.exports.TrainingModule = TrainingModule
module.exports.validateTrainingModule = validateTrainingModule