const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User } = require('../models/user')

exports.getRegister = (req, res, next) => {
    let errorMessage = req.flash('error')
    if (errorMessage.length > 0) {
        errorMessage = errorMessage[0]
    } else {
        errorMessage = null
    }
    res.render('auth/register', {
        pageTitle: "Register",
        errorMessage: errorMessage
    })
}

exports.postRegister = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    let user = await User.findOne({ email: email })
    if (user) {
        req.flash('error', 'User email already exists. Log in or try again.')
        return res.redirect('/register')
    }

    if (password !== confirmPassword) {
        req.flash('error', "Passwords do not match.")
    }

    const hashedPass = await bcrypt.hash(password, 10)
    user = new User({
        email: email,
        password: hashedPass
    })
    await user.save()
    req.flash('success', 'Successfully registered! Please log in.')
    res.redirect('/login')
}

exports.getLogin = (req, res, next) => {
    let errorMessage = req.flash('error')
    if (errorMessage.length > 0) {
        errorMessage = errorMessage[0]
    } else {
        errorMessage = null
    }

    let successMessage = req.flash('success')
    if (successMessage.length > 0) {
        successMessage = successMessage[0]
    } else {
        successMessage = null
    }

    res.render('auth/login', {
        pageTitle: "Login",
        errorMessage: errorMessage,
        successMessage: successMessage
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
    req.flash('success', 'Successfully logged in!')
    res.redirect('/me')
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) console.log(err)
        res.redirect('/')
    })
}