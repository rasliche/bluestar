const express = require('express')
const _ = require('lodash')

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const adminController = require('../controllers/admin')

const { User } = require('../models/user')
const { Shop } = require('../models/shop')
const { boostrapAdminUser, fakeUser, fakeShop } = require('../utilities/db-utilities')

const router = express.Router()

// GET /admin
router.get('/', adminController.getAdminIndex)

// GET /admin/seed-database
router.get('/seed-database/', async (req, res, next) => {
    try {
        let shopPromises = []
        let userPromises = []
        let slicedShops

        await User.deleteMany({})
        await Shop.deleteMany({})
        await boostrapAdminUser()
        
        _.range(1,4).forEach(i => {
            shopPromises.push(fakeShop())
        })

        _.range(1,10).forEach(i => {
            userPromises.push(fakeUser())
        })

        const shopResults = await Promise.all(shopPromises)
        const userResults = await Promise.all(userPromises)
        
        console.log("Shops: ", shopResults)
        console.log("Users: ", userResults)

        _.forEach(userResults, async user => {
            slicedShops = _.chain(shopResults)
                .shuffle()
                .slice(0, _.random(3))
                .map(shop => shop._id)
                .value()
            console.log(slicedShops)
            for (shop of slicedShops) {
                await user.joinShop(shop)
            }
        })
        
        // _.range(1,6).forEach((i) => {
        //     console.log("Sliced Shops: ", slicedShops)
        //     await fakeUser(slicedShops)
        // })

        res.redirect('/admin')
    } catch (err) {
        console.log(err)
    }

})

module.exports = router