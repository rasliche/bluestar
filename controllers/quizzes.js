const { Quiz } = require('../models/quiz')
const { User } = require('../models/user')

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
    const quiz = await Quiz.findById(req.params.lessonId)

    console.log(quiz.title)

    res.render('quiz/quiz', {
        pageTitle: quiz.title,
        quiz: quiz,
    })
}

exports.postQuizzes = async (req, res, next) => {
    let quiz = new Quiz({
        title: req.body.title,
        content: req.body.content
    })
    await quiz.save()
    res.redirect(`/quizzes/${quiz._id}`)
}

exports.getEditQuiz = async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.quizId)
    console.log(quiz.title)
    res.render('quiz/edit-quiz', {
        pageTitle: `Edit ${quiz.title}`,
        quiz: quiz
    })
}

    res.redirect(`/quizzes/${quizId}/edit`)
}
exports.postUpdateQuiz = async (req, res, next) => {
    const quiz = await Quiz.findByIdAndUpdate(req.params.lessonId, {
        name: req.body.name,
        password: req.body.password || quiz.password
    })

    res.redirect(`/quizzes/${quiz._id}/edit`)
}

exports.postAddManager = async (req, res, next) => {
    const user = await User.findById(req.params.userId)
    user.makeManager(req.params.lessonId)

    const quiz = await Quiz.findById(req.params.lessonId)
    quiz.addManager(req.params.userId)

    res.redirect(`/quizzes/${quiz._id}`)
}

exports.deleteQuiz = async (req, res, next) => {
    await Quiz.findByIdAndDelete(req.params.lessonId)

    res.redirect(`/quizzes`)
}
