const { Shop } = require('../models/shop')

exports.getShops = async (req, res, next) => {
    const shops = await Shop.find()
    console.log(shops)
    res.render('shop/index', {
        shops: shops,
        user: req.session.user
    })
}
