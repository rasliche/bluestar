const f = require('faker')
const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const { Shop } = require('../models/shop')

function getRandomRegion() {
    const regions = [ 'upper', 'middle', 'lower', 'keywest']
    const i = Math.floor(Math.random() * 3)
    return regions[i]
}

exports.boostrapAdminUser = async () => {
    const hashedPass = await bcrypt.hash('12345', 12)
    let adminUser = new User({
        name: "Eric",
        email: 'rasliche@gmail.com',
        password: hashedPass,
        shops: [],
        isAdmin: true
    })
    await adminUser.save()
    // console.log("Admin User: ", adminUser)
    return adminUser
}

exports.fakeUser = async (shops) => {
    const hashedPass = await bcrypt.hash(f.hacker.noun(), 12)
    let fakeUser = new User({
        name: f.name.findName(),
        email: f.internet.email(),
        shops: shops,
        password: hashedPass
    })
    await fakeUser.save()
    // console.log("Fake user: ", fakeUser)
    return fakeUser
}

exports.fakeShop = async () => {
    let fakeShop = new Shop({
        name: f.company.companyName(),
        email: f.internet.email(),
        password: "asdf",
        phone: f.phone.phoneNumber(),
        region: getRandomRegion(),
        website: f.internet.domainName()
    })
    await fakeShop.save()
    // console.log("Fake Shop: ", fakeShop)
    return fakeShop
}
