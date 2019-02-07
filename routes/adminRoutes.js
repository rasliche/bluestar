const express = require('express')
const router = express.Router()
// const _ = require('lodash')

const adminController = require('../controllers/adminController')

// const { User } = require('../models/user')
// const { Shop } = require('../models/shop')
// const { boostrapAdminUser, fakeUser, fakeShop } = require('../utilities/db-utilities')

// GET /admin
router.get('/', adminController.homePage)

// // GET /admin/seed-database
// router.get('/seed-database/', async (req, res, next) => {
//   try {
//     let shopPromises = []
//     let userPromises = []
//     let slicedShops

//     await User.deleteMany({})
//     await Shop.deleteMany({})
//     await boostrapAdminUser()

//     _.range(1, 16).forEach(i => {
//       shopPromises.push(fakeShop())
//     })

//     _.range(1, 88).forEach(i => {
//       userPromises.push(fakeUser())
//     })

//     const shopResults = await Promise.all(shopPromises)
//     const userResults = await Promise.all(userPromises)

//     console.log('Shops: ', shopResults)
//     console.log('Users: ', userResults)

//     _.forEach(userResults, async user => {
//       slicedShops = _.chain(shopResults)
//         .shuffle()
//         .slice(0, _.random(3))
//         .map(shop => shop._id)
//         .value()
//       console.log(slicedShops)
//       for (shop of slicedShops) {
//         await user.joinShop(shop)
//       }
//     })

//     res.redirect('/admin')
//   } catch (err) {
//     console.log(err)
//   }
// })

module.exports = router
