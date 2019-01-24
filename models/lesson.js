const mongoose = require('mongoose')
const Joi = require('joi')

const lessonSchema = new mongoose.Schema({
    // TODO: Shape data better (min lengths, max lengths)
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    content: {
        type: String
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        default: null
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
        type: Date
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    editedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    programs: [
        {
            type: String,
            enum: ['diving', 'fishing', 'staff', 'volunteer']
        }
    ]
})

function validateLesson(lessonSchema) {
    const schema = {
        title: Joi.string().required(),
        content: Joi.string().required()
    }

    return Joi.validate(lessonSchema, schema)
}

const Lesson = mongoose.model('Lesson', lessonSchema)

module.exports.Lesson = Lesson
module.exports.validateLesson = validateLesson