const { Quiz } = require('../models/quiz')
const { User } = require('../models/user')
const { addQuestionToQuiz } = require('../services/quiz.services')

exports.getQuizzes = async (req, res, next) => {
    // TODO: 
    //  - pagination for quizzes
    const quizzes = await Quiz.find()

    console.log(quizzes)
    res.render('quiz/index', {
        pageTitle: "All Quizzes",
        quizzes: quizzes
    })
}

exports.getNewQuiz = (req, res, next) => {
    res.render('quiz/new-quiz', {
        pageTitle: "New Quiz"
    })
}
    
exports.getQuiz = async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.quizId)

    console.log(quiz.title)

    res.render('quiz/quiz', {
        pageTitle: quiz.title,
        quiz: quiz,
    })
}

exports.postQuizzes = async (req, res, next) => {
    console.log(req.body.title)
    let quiz = new Quiz({
        title: req.body.title
    })
    await quiz.save()
    res.redirect(`/quizzes/${quiz._id}/edit`)
}

exports.getEditQuiz = async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.quizId)
    res.render('quiz/edit-quiz', {
        pageTitle: `Edit ${quiz.title}`,
        quiz: quiz
    })
}

exports.postQuizAddQuestion = async (req, res, next) => {
    const { quizId } = req.params
    const question = {
        text: req.body.text,
        answers: req.body.answers
    }

    await addQuestionToQuiz(quizId, question) // need to await this

    res.redirect(`/quizzes/${quizId}/edit`)
}

exports.postUpdateQuiz = async (req, res, next) => {
    const quiz = await Quiz.findByIdAndUpdate(req.params.quizId, {
        title: req.body.title
    })

    res.redirect(`/quizzes/${quiz._id}/edit`)
}

exports.deleteQuiz = async (req, res, next) => {
    await Quiz.findByIdAndDelete(req.params.lessonId)

    res.redirect(`/quizzes`)
}
