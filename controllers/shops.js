const { Shop } = require('../models/shop')
const { User } = require('../models/user')

exports.getShops = async (req, res, next) => {
    // TODO: 
    //  - pagination for shops
    const shops = await Shop.find()
        .sort('-region name')
    console.log(shops)
    res.render('shop/index', {
        pageTitle: "All Shops",
        shops: shops
    })
}

exports.getNewShop = (req, res, next) => {
    res.render('shop/new-shop', {
        pageTitle: "New Shop"
    })
}
    
exports.getShop = async (req, res, next) => {
    const shop = await Shop.findById(req.params.shopId)
        .populate('managers', 'name id')
    const staff = await User.find()
        .where('shops').in(req.params.shopId)
        .select('name id')

    console.log(shop)

    res.render('shop/shop', {
        pageTitle: shop.name,
        shop: shop,
        staff: staff
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

exports.getEditShop = async (req, res, next) => {
    const shop = await Shop.findById(req.params.shopId)
    console.log(shop)
    res.render('shop/edit-shop', {
        pageTitle: `Edit ${shop.name}`,
        shop: shop
    })
}

exports.postUpdateShop = async (req, res, next) => {
    const shop = await Shop.findByIdAndUpdate(req.params.shopId, {
        name: req.body.name,
        password: req.body.password || shop.password
    })

    res.redirect(`/shops/${shop._id}/edit`)
}

exports.postAddManager = async (req, res, next) => {
    const user = await User.findById(req.params.userId)
    user.makeManager(req.params.shopId)

    const shop = await Shop.findById(req.params.shopId)
    shop.addManager(req.params.userId)

    res.redirect(`/shops/${shop._id}`)
}

exports.deleteShop = async (req, res, next) => {
    await Shop.findByIdAndDelete(req.params.shopId)

    res.redirect(`/shops`)
}
