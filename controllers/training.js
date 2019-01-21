const { Lesson } = require('../models/lesson')
const { Quiz } = require('../models/quiz')

exports.getDivingCurriculum = async (req, res, next) => {
    // Fetch all diving related modules
    const lessons = await Lesson.find().where('programs').in('diving')

    res.render('training/curriculum', {
        pageTitle: 'Diving',
        lessons: lessons
    })
}

exports.getFishingCurriculum = async (req, res, next) => {
    // Fetch all fishing related modules
    const lessons = await Lesson.find().where('programs').in('fishing')

    res.render('training/curriculum', {
        pageTitle: 'Fishing',
        lessons: lessons
    })
}

exports.getTrainingModule = (req, res, next) => {
    res.render('training/modules/'+req.params.moduleName, {
        module: req.params.moduleName
    })
}