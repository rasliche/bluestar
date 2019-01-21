const mongoose = require('mongoose')
const Joi = require('joi')

const quizSchema = new mongoose.Schema({
    // TODO: Shape data better (min lengths, max lengths)
    questions: [ // array of questions with text and an array of answers
        {
            text: String,
            answers: [ // array of answers with text and a T/F flag
                {
                    text: { type: String },
                    correct: { type: Boolean }
                }
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