const Shop = require('../models/shop')

exports.getShops = (req, res, next) => {
    const shops = Shop.fetchAll()

    res.render('shop/index', {
        pageTitle: 'Shops',
        shops: shops,
        loggedIn: req.session.loggedIn
    })
}

exports.getAddShop = (req, res, next) => {
    res.render('admin/add-shop', {
        pageTitle: 'Add Shop',
        loggedIn: req.session.loggedIn
    })
}

exports.postShops = (req, res, next) => {
    console.log(req.body)
    const shop = new Shop(req.body.name)
    shop.save()

    res.redirect('/shops')
}