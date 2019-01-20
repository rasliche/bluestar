const mongoose = require('mongoose')
const Joi = require('joi')

const quizSchema = new mongoose.Schema({
    // TODO: Shape data better (min lengths, max lengths)
    questions: [
        {
            text: String,
            wrongAnswers: [
                { type: String }
            ],
            correctAnswers: [
                { type: String }
            ]
        }
    ],
    isActive: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
})

function validateQuiz(quiz) {
    const schema = {
        
    }

    return Joi.validate(quiz, schema)
}

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports.Quiz = Quiz
module.exports.validateQuiz = validateQuiz