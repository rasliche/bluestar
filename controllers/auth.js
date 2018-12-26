const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User } = require('../models/user')

exports.getRegister = (req, res, next) => {
    res.render('auth/register', {
        pageTitle: "Register"
    })
}

exports.postRegister = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    let user = await User.findOne({ email: email })
    if (user) return res.redirect('/register')

    const hashedPass = await bcrypt.hash(password, 10)
    user = new User({
        email: email,
        password: hashedPass
    })
    await user.save()

    res.redirect('/login')
}

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: "Login",
        errorMessage: req.flash('error')
        })
}

exports.postLogin = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        req.flash('error', 'Invalid email or password.')
        return res.redirect('/login')
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        req.flash('error', 'Invalid email or password.')
        return res.redirect('/login')
    }

    req.session.user = _.pick(user, 
        [
            '_id', 
            'name', 
            'email', 
            'shops',
            'records', 
            'isAdmin', 
            'isManager'
        ])
    await req.session.save()
    res.redirect('/me')
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) console.log(err)
        res.redirect('/')
    })
}