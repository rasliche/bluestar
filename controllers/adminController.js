const { Shop } = require('../models/shop')

exports.homePage = async (req, res, next) => {
  const shops = await Shop.find()

  res.render(`admin/index`, {
    pageTitle: "Admin",
    shops: shops
  })
}

exports.addLesson = (req, res, next) => {
  res.render(`editLesson`, { title: `Add Lesson` })
}