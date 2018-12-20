const { User } = require('../models/user')


exports.getMe = (req, res, next) => {
    res.render('user/me', {
        user: req.session.user,
        nextTrainingLink: '/'
    })
}

exports.getAddUser = (req, res, next) => {
    res.render('admin/add-user', {
        pageTitle: 'Add User'
    })
}

exports.postAddUser = (req, res, next) => {
    
}