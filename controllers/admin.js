const { User } = require('../models/user')
const { Shop } = require('../models/shop')

exports.getAdminIndex = async (req, res, next) => {
    // select users with most recently completed modules
    const users = await User.find().select(["-password"])
    const shops = await Shop.find()
    console.log(users)
    res.render('admin/index', {
        pageTitle: 'Admin Panel',
        users: users,
        shops: shops,
        // user: req.session.user
        // shops: Shop.fetchAll()
    })
}

exports.postAddShop = async (req, res, next) => {
    let shop = await Shop.findOne({ name: req.body.name })
    if (shop) return res.redirect('/admin')

    shop = new Shop({
        name: req.body.name,
        password: req.body.password
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
