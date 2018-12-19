exports.getRegister = (req, res, next) => {
    res.render('auth/register', {
        pageTitle: "Register",
        loggedIn: req.session.loggedIn
    })
}

exports.postRegister = (req, res, next) => {

}

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: "Login",
        loggedIn: req.session.loggedIn
    })
}

exports.postLogin = (req, res, next) => {
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) console.log(err)
    res.redirect('/')
    })
}
