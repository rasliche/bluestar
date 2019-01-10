const express = require('express')

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const adminController = require('../controllers/admin')

const { User } = require('../models/user')
const { Shop } = require('../models/shop')
const { boostrapAdminUser, fakeUser, fakeShop } = require('../utilities/seed-database')

const router = express.Router()

// GET /admin
router.get('/', adminController.getAdminIndex)

// GET /admin/seed-database
router.get('/seed-database/', async (req, res, next) => {
    try {
        await User.deleteMany({})
        console.log('User collection removed...')
        await Shop.deleteMany({})
        console.log('Shop collection removed...')

        await boostrapAdminUser()
        console.log('Creating new fake users...')

        let i = 0;
        while (i < 35) {
            if (i % 6 === 0) { 
                fakeShop()
                console.log('Creating a fake shop...')
            }
            fakeUser()
            i++
        }
    } catch (err) {
        console.log(err)
    }

    console.log('Fake users created, check Users collection.')
    res.redirect('/admin')
})

module.exports = router