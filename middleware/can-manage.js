module.exports = (req, res, next) => {
    if (req.session.user.isAdmin) { // or has the shop in the isManager array
        return next()
    }
    res.redirect('/login')
}