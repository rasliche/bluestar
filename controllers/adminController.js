exports.homePage = (req, res, next) => {
    res.send(`Admin Homepage`)
}

exports.addLesson = (req, res, next) => {
    res.render(`editLesson`, { title: `Add Lesson` })
}

exports.addShop = (req, res, next) => {
    res.render(`editShop`, { title: `Add Shop` })
}