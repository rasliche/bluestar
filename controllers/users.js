const { User } = require('../models/user')


exports.getMe = async (req, res, next) => {
    if (!req.session.user) return res.redirect('/login')

    res.render('user/me', {
        user: req.session.user
    })
}

exports.getAddUser = (req, res, next) => {
    res.render('admin/add-user', {
        pageTitle: 'Add User',
        loggedIn: req.session.loggedIn
    })
}

exports.postAddUser = (req, res, next) => {
    
}