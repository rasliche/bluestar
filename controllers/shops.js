const { Shop } = require('../models/shop')

exports.getShops = async (req, res, next) => {
    const shops = await Shop.find()
    console.log(shops)
    res.render('shop/index', {
        pageTitle: "All Shops",
        shops: shops,
        user: req.session.user
    })
}

exports.postShops = async (req, res, next) => {
    let shop = new Shop({
        name: req.body.name,
        password: req.body.password
    })

    await shop.save()
    res.redirect(`/shops/${shop._id}`)
}

exports.getShop = async (req, res, next) => {
    const shop = await Shop.findById(req.params.shopId)

    console.log(shop)

    res.render('shop/shop', {
        pageTitle: shop.name,
        shop: shop
    })
}

exports.getNewShop = (req, res, next) => {
    res.render('admin/new-shop', {
        pageTitle: "New Shop",
        user: req.session.user
    })
}