module.exports = (req, res, next) => {
    const u = req.user
    if (u.isAdmin || u.isManager.includes(req.params.ShopId)) {
        return next()
    }
    res.redirect('/login')
}