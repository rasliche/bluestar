const { Lesson } = require('../models/lesson')
const { User } = require('../models/user')
const { Quiz } = require('../models/quiz')

exports.getLessons = async (req, res, next) => {
    // TODO: 
    //  - pagination for lessons
    const lessons = await Lesson.find()

    console.log(lessons)
    res.render('lesson/index', {
        pageTitle: "All Lessons",
        lessons: lessons,
        // user: req.session.user
    })
}

exports.getNewLesson = (req, res, next) => {
    res.render('lesson/new-lesson', {
        pageTitle: "New Lesson",
        // user: req.session.user
    })
}
    
exports.getLesson = async (req, res, next) => {
    const lesson = await Lesson.findById(req.params.lessonId)

    console.log(lesson.title)

    res.render('lesson/lesson', {
        pageTitle: lesson.title,
        lesson: lesson,
    })
}

exports.getLessonQuiz = async (req, res, next) => {
    const quiz = await Lesson.findById(req.params.lessonId).select('quiz').populate('quiz')

    res.render('training/quiz/quiz', {
        pageTitle: quiz.title
    })
}

// exports.getLessonQuizEdit = async (req, res, next) => {
//     const quiz = await Lesson.findById(req.params.lessonId).select('quiz').populate('quiz')

//     res.render('quiz/edit-quiz', {
//         pageTitle: quiz.title
//     })
// }

exports.postLessons = async (req, res, next) => {
    let quiz = new Quiz({
        title: req.body.title,
        createdBy: req.user._id,
        createdDate: Date.now()
    })
    await quiz.save()

    let lesson = new Lesson({
        title: req.body.title,
        content: req.body.content,
        quiz: quiz._id
    })
    await lesson.save()
    res.redirect(`/lessons/${lesson._id}`)
}

exports.getEditLesson = async (req, res, next) => {
    const lesson = await Lesson.findById(req.params.lessonId).populate('quiz')

    res.render('lesson/edit-lesson', {
        pageTitle: `Edit ${lesson.title}`,
        lesson: lesson
    })
}

exports.postUpdateLesson = async (req, res, next) => {
    const lesson = await Lesson.findByIdAndUpdate(req.params.lessonId, {
        name: req.body.name,
        password: req.body.password || lesson.password
    })

    res.redirect(`/lessons/${lesson._id}/edit`)
}

exports.postAddManager = async (req, res, next) => {
    const user = await User.findById(req.params.userId)
    user.makeManager(req.params.lessonId)

    const lesson = await Lesson.findById(req.params.lessonId)
    lesson.addManager(req.params.userId)

    res.redirect(`/lessons/${lesson._id}`)
}

exports.deleteLesson = async (req, res, next) => {
    await Lesson.findByIdAndDelete(req.params.lessonId)

    res.redirect(`/lessons`)
}
