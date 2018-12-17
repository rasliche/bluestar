exports.getRegister = (req, res, next) => {
    res.render('auth/register', {
        pageTitle: "Register"
    })
}

exports.postRegister = (req, res, next) => {
    console.log("POST /auth/register")
}

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: "Login"
    })
}

exports.postLogin = (req, res, next) => {
    console.log("POST /auth/login")
}

