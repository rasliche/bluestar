module.exports = (req, res, next) => {
    if (req.session.user.isAdmin) {
        return next()
    }
    res.redirect('/login')
}