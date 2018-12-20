const { User } = require('../models/user')
const { Shop } = require('../models/shop')

exports.getAdminIndex = async (req, res, next) => {
    const users = await User.find()
    console.log(users)
    res.render('admin/index', {
        pagetitle: 'Admin Panel',
        users: users,
        user: req.session.user
        // shops: Shop.fetchAll()
    })
}

exports.getAddShop = async (req, res, next) => {
    res.redirect('/admin')
}

exports.postAddShop = async (req, res, next) => {
    const name = req.body.name
    const password = req.body.password

    let shop = await Shop.findOne({ name: name })
    if (shop) return res.redirect('/admin/shops')

    shop = new Shop({
        name: name,
        password: password
    })
    await shop.save()
    res.redirect('/shops')
}

exports.getAddUser = async (req, res, next) => {
    res.redirect('/admin')
}

exports.postAddUser = async (req, res, next) => {
    res.redirect('/admin')
}
