const express = require('express')
const router = express.Router()

const { Shop, validate } = require('../../models/shop')

router.get('/', async (req, res) => {
    const shops = await Shop.find()
    res.send("GET /api/shops", shops)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let shop = new Shop({
        name: req.body.name
    })
    
    shop = await shop.save()
    res.send(shop)
})

module.exports = router