exports.homePage = (req, res, next) => {
  res.render('training/index', {
    pageTitle: 'Training Home'
  })
}

exports.getAboutFKNMSModule = (req, res, next) => {
  res.render('training/modules/about-fknms', {
    pageTitle: 'About FKNMS'
  })
}

exports.getAboutBlueStarModule = (req, res, next) => {
  res.render('training/modules/about-blue-star', {
    pageTitle: 'About Blue Star'
  })
}