const adminRoutes = require('../routes/admin')
const usersRoutes = require('../routes/users')
const shopsRoutes = require('../routes/shops')
const lessonsRoutes = require('../routes/lessons')
const quizzesRoutes = require('../routes/quizzes')
const trainingRoutes = require('../routes/training')
const communityRoutes = require('../routes/community')
const authRoutes = require('../routes/auth')
const errorController = require('../controllers/error')
const devRoutes = require('../routes/dev')

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

module.exports = function(app) {
    app.get('/', (req, res, next) => {
        res.render('index', {
            pageTitle: "Blue Star",
        })
    })

    app.use('/users', usersRoutes)
    app.use('/shops', shopsRoutes)
    app.use('/lessons', lessonsRoutes)
    app.use('/quizzes', quizzesRoutes)
    app.use('/training', trainingRoutes)
    app.use('/admin', adminRoutes)
    app.use('/community', communityRoutes)
    app.use('/dev', devRoutes)
    app.use(authRoutes)

    // app.use('/500', errorController.get500)
    // app.use(errorController.get404)
    
    // app.use((error, req, res, next) => {
    //     res.render('500', {
    //         pageTitle: "Error!"
    //     })
    // })
    
}