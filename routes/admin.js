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
        const shops = []
        let slicedShops

        await User.deleteMany({})
        console.log('User collection removed...')
        await Shop.deleteMany({})
        console.log('Shop collection removed...')

        await boostrapAdminUser()
        console.log('Creating new fake users...')
        
        _.forEach(_.range(1,10), () => {
            shops.push(fakeShop())
        })
        
        _.forEach(_.range(1,60), () => {
            slicedShops = _.map(_.slice(_.shuffle(shops), 0, _.random(3)),  (shop) => {
                return shop._id
            })
            fakeUser(slicedShops)
        })
    } catch (err) {
        console.log(err)
    }

    console.log('Fake users created, check Users collection.')
    res.redirect('/admin')
})

module.exports = router