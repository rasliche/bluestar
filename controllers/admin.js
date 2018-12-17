const User = require('../models/user')
const Shop = require('../models/shop')

exports.getAdminIndex = async (req, res, next) => {
    const users = await User.find()
    console.log(users)
    res.render('admin/index', {
        pagetitle: 'Admin Panel',
        users: users,
        // shops: Shop.fetchAll()
    })
}