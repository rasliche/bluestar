const { Lesson } = require('../models/lesson')

exports.getLessons = async (req, res, next) => {
    // TODO: 
    //  - pagination for lessons
    const lessons = await Lesson.find()

    console.log(lessons)
    res.render('lesson/index', {
        pageTitle: "All Lessons",
        lessons: lessons
    })
}

exports.getCreate = (req, res, next) => {
    res.render('lesson/create', {
        pageTitle: "New Lesson",
    })
}

exports.getLesson = async (req, res, next) => {
    const lesson = await Lesson.findById(req.params.lessonId)
    res.render('lesson/lesson', {
        pageTitle: lesson.title,
        lesson: lesson,
    })
}

exports.getLessonQuiz = async (req, res, next) => {
    const quiz = await Lesson.findById(req.params.lessonId).select('quiz')
    res.render('training/quiz/quiz', {
        pageTitle: quiz.title
    })
}

exports.getLessonQuizEdit = async (req, res, next) => {
    const lesson = await Lesson.findById(req.params.lessonId).select('quiz').populate('quiz')

    res.render('lesson/quiz/edit-quiz', {
        pageTitle: lesson.title,
        lesson: lesson,
        quiz: lesson.quiz
    })
}

exports.postLessons = async (req, res, next) => {
    const { title } = req.body
    let lesson = new Lesson({
        title: title,
        createdBy: req.user._id
    })
    lesson = await lesson.save()
    res.redirect(`/lessons/${lesson._id}/edit`)
}

exports.getLessonEdit = async (req, res, next) => {
    const lesson = await Lesson.findById(req.params.lessonId)
    // if (lesson.createdBy === lesson.editedBy) lesson.editedBy = await User.findById(lesson._id).select('name')
    // lesson.createdBy = await User.findById(lesson._id).select('name')

    res.render('lesson/edit-lesson', {
        pageTitle: `Edit ${lesson.title}`,
        lesson: lesson
    })
}

exports.postUpdateLesson = async (req, res, next) => {
    let { title, content, isActive, programs, quiz, cardThumbnail } = req.body
    if (!quiz) quiz = null
    const lesson = await Lesson.findByIdAndUpdate(req.params.lessonId, {
        title: title,
        content: content,
        isActive: !!isActive,
        programs: programs,
        quiz: quiz,
        cardThumbnail: cardThumbnail,
        editedDate: Date.now(),
        editedBy: req.user._id
    })

    res.redirect(`/lessons/${lesson._id}/edit`)
}

exports.deleteLesson = async (req, res, next) => {
    await Lesson.findByIdAndDelete(req.params.lessonId)

    res.redirect(`/lessons`)
}
