const { User } = require('../models/user')


exports.getMe = (req, res, next) => {
    let message = req.flash('success')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('user/me', {
        user: req.session.user,
        nextTrainingLink: '/',
        successMessage: message
    })
}

exports.getAddUser = (req, res, next) => {
    res.render('admin/add-user', {
        pageTitle: 'Add User'
    })
}

exports.postAddUser = (req, res, next) => {
    
}