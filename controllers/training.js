const DIVING_CURRICULUM = [
    {title: 'About Blue Star', slug: 'about-blue-star', id: 1},
    {title: 'About Florida Keys National Marine Sanctuary', slug: 'about-fknms', id:2},
    {title: 'Maritime Heritage', slug: 'maritime-heritage', id: 6}
]
const FISHING_CURRICULUM = [
    {title: 'About Blue Star', slug: 'about-blue-star', id: 1},
    {title: 'About Florida Keys National Marine Sanctuary', slug: 'about-fknms', id:2},
]


exports.getMe = (req, res, next) => {
    res.render('user/me', {
        pageTitle: "My Profile",
        user: {
            name: 'Eric Raslich'
        },
        nextTrainingLink: '/'
    })
}

exports.postRegister = (reg, res, next) => {
    
}

exports.postLogin = (reg, res, next) => {

}

exports.getDivingCurriculum = (req, res, next) => {
    // Fetch all diving related modules
    res.render('training/curriculum', {
        pageTitle: 'Diving',
        curriculum: DIVING_CURRICULUM
    })
}

exports.getFishingCurriculum = (req, res, next) => {
    // Fetch all fishing related modules
    res.render('training/curriculum', {
        pageTitle: 'Fishing',
        curriculum: FISHING_CURRICULUM
    })
}

exports.getTrainingModule = (req, res, next) => {
    res.render('training/modules/'+req.params.moduleName)
}