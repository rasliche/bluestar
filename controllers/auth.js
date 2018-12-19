exports.getRegister = (req, res, next) => {
    res.render('auth/register', {
        pageTitle: "Register"
    })
}

exports.postRegister = (req, res, next) => {

}

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: "Login"
    })
}

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true; Secure; HTTP;')
    res.redirect('/')
}

