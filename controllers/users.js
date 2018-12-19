const { User } = require('../models/user')


exports.getMe = async (req, res, next) => {
    const user = await User.findById(req.session.user._id)
    res.render('user/me', {
        user: user
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