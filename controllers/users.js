const { User } = require('../models/user')


exports.getMe = (req, res, next) => {
    res.render('user/me', {
        pageTitle: "My Profile",
        user: req.session.user,
        loggedIn: !!req.session.user,
        nextTrainingLink: '/'
    })
}

exports.getAddUser = (req, res, next) => {
    res.render('admin/add-user', {
        pageTitle: 'Add User',
        loggedIn: !!req.session.user
    })
}

exports.postAddUser = (req, res, next) => {
    
}