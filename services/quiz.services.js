const { Quiz } = require('../models/quiz')
const _ = require('lodash')

module.exports.addQuestionToQuiz = async (quizId, question) => {
    // validated question from controller
    question.answers = _.zip(question.answers, [true, false, false, false])
    question.answers = question.answers.map(answer => {
        return { 
            text: answer[0],
            correct: answer[1]
        }
    })

    const quiz = await Quiz.findById(quizId)
    quiz.questions.push(question)
    return quiz.save() // returns a quiz promise
}