const config = require('config')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const _ = require('lodash')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const { User } = require('../models/user')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: config.get('sendgrid_api_key')
    }
}))

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

    const hashedPass = await bcrypt.hash(password, 12)
    user = new User({
        email: email,
        password: hashedPass
    })
    await user.save()

    // Not waiting for this to send, so no "await"
    transporter.sendMail({
        to: email,
        from: "BlueStar.Developer@gmail.com",
        subject: "signup succeeded",
        html: "<h1>You signed up successfully.</h1"
    })

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
    
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            req.flash('error', 'Invalid email or password.')
            return res.redirect('/login')
        }
    } catch (err) {
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
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
    res.redirect('users/me')
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) console.log(err)
        res.redirect('/')
    })
}

exports.getReset = (req, res, next) => {
    let errorMessage = req.flash('error')
    if (errorMessage.length > 0) {
        errorMessage = errorMessage[0]
    } else {
        errorMessage = null
    }

    res.render('auth/reset', {
        pageTitle: "Reset Password",
        errorMessage: errorMessage
        })
}

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, async (err, buffer) => {
        if (err) return res.redirect('/reset')

        const token = buffer.toString('hex')
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            req.flash('error', "No account with given email.")
            return res.redirect('/reset')
        }

        user.resetToken = token
        user.resetTokenExpiration = Date.now() + (60*60*1000)
        await user.save()

        transporter.sendMail({
            to: req.body.email,
            from: "BlueStar.Developer@gmail.com",
            subject: "Password Reset",
            html: `
                <p>You requested a password reset.</p>
                <p>Click <a href="http://localhost:3000/reset/${token}">this link</a> to reset your password.</p>
            `
        })
        res.redirect('/login')
    })
}

exports.getPasswordResetWithToken = async (req, res, next) => {
    const token = req.params.resetToken

    const user = await User.findOne({
        resetToken: token, 
        resetTokenExpiration: { $gt: Date.now() }
    })

    let errorMessage = req.flash('error')
    if (errorMessage.length > 0) {
        errorMessage = errorMessage[0]
    } else {
        errorMessage = null
    }
    
    res.render('auth/new-password', {
        pageTitle: "Update Password",
        errorMessage: errorMessage,
        userId: user._id.toString(),
        passwordToken: token
    })
}

exports.postPasswordResetWithToken = async (req, res, next) => {
    const newPassword = req.body.password
    const userId = req.body.userId
    const resetToken = req.body.passwordToken

    const user = await User.findOne({
        _id: userId,
        resetToken: resetToken,
        resetTokenExpiration: { $gt: Date.now() }
    })
    
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    user.password = hashedPassword
    user.resetToken = undefined
    user.resetTokenExpiration = undefined
    await user.save()

    res.redirect('/login')
}