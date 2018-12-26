exports.getIndex = (req, res, next) => {
    res.render('community/index', {
        pageTitle: "Community",
        user: req.session.user
    })
}

exports.getCalendar = (req, res, next) => {
    res.render('community/index', {
        pageTitle: "Calendar",
    })
}

exports.getBlog = (req, res, next) => {
    res.render('community/index', {
        pageTitle: "Blog",
        user: req.session.user
    })
}