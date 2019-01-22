const mongoose = require('mongoose')
const Joi = require('joi')

const quizSchema = new mongoose.Schema({
    // TODO: Shape data better (min lengths, max lengths)
    title: {
        type: String,
        required: true
    },
    questions: [ // array of questions with text and an array of answers
        {
            text: {
                type: String,
                default: "Enter new question?"
            },
            answers: [ // array of answers with text and a T/F flag
                {
                    text: { type: String, default: "This is a wrong answer." },
                    correct: { type: Boolean, default: false },
                }
            ]
        }
    ],
    createdDate: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    editedDate: {
        type: Date
    },
    editedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

function validateQuiz(quiz) {
    const schema = {
        
    }

    return Joi.validate(quiz, schema)
}

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports.Quiz = Quiz
module.exports.validateQuiz = validateQuiz