module.exports = (req, res, next) => {
    if (req.session.user.isAdmin) {
        return next()
    }
    req.flash('error', 'Not authorized to view the requested page.')
    res.redirect('/login')
}