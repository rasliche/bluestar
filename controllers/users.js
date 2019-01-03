const { User } = require('../models/user')


exports.getMe = (req, res, next) => {
    let message = req.flash('success')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('user/me', {
        // user: req.session.user,
        pageTitle: "Me",
        nextTrainingLink: '/',
        successMessage: message
    })
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find()
    console.log(users)
    res.render('user/index', {
        pageTitle: "All Users",
        users: users,
        // user: req.session.user
    })
}

// Do I need this route?

// exports.getNewUser = (req, res, next) => {
//     res.render('user/new-user', {
//         pageTitle: "New User",
//         user: req.session.user
//     })
// }
    
exports.getUser = async (req, res, next) => {
    const user = await User.findById(req.params.userId)

    console.log(user)

    res.render('user/user', {
        pageTitle: user.name,
        user: user
    })
}

// Do we need this route? Users create themselves

// exports.postUsers = async (req, res, next) => {
//     let user = new User({
//         name: req.body.name,
//         password: req.body.password
//     })

//     await user.save()
//     res.redirect(`/users/${user._id}`)
// }

exports.getEditUser = async (req, res, next) => {
    const user = await User.findById(req.params.userId)
    console.log(user)
    res.render('user/edit-user', {
        pageTitle: `Edit ${user.name}`,
        user: user
    })
}

exports.postUpdateUser = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name,
        password: req.body.password
    })

    res.redirect(`/users/${user._id}`)
}

exports.deleteUser = async (req, res, next) => {
    await User.findByIdAndDelete(req.params.userId)

    res.redirect(`/users`)
}