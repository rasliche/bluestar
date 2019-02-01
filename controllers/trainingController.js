exports.homePage = (req, res, next) => {
    res.render(`index`)
}

exports.addLesson = (req, res, next) => {
    res.render(`editLesson`, { title: `Add Lesson` })
}