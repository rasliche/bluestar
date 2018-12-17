const express = require('express')
const router = express.Router()

const { User, validate } = require('../../models/user')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send("GET /api/users", users)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = new User({
        email: req.body.email,
        password: req.body.password
    })
    
    user = await user.save()
    res.send(user)
})

module.exports = router