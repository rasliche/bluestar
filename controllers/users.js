const User = require('../models/user')

exports.getAddUser = (req, res, next) => {
    res.render('admin/add-user', {
        pageTitle: 'Add User'
    })
}

exports.postAddUser = (req, res, next) => {
    
}