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
    const adminUser = new User({
        name: "Eric",
        email: 'rasliche@gmail.com',
        password: hashedPass,
        isAdmin: true
    })
    await adminUser.save()
}

exports.fakeUser = async () => {
    const hashedPass = await bcrypt.hash(f.hacker.noun(), 12)
    const fakeUser = new User({
        name: f.name.findName(),
        email: f.internet.email(),
        password: hashedPass,

    })
    await fakeUser.save()
}

exports.fakeShop = async () => {
    const fakeShop = new Shop({
        name: f.company.companyName(),
        email: f.internet.email(),
        password: f.lorem.word(),
        phone: f.phone.phoneNumber(),
        region: getRandomRegion(),
        website: `${f.internet.domainName()}.${f.internet.domainSuffix()}`
    })
    await fakeShop.save()
}
