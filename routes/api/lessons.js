const express = require('express')
const router = express.Router()

const { Lesson, validateLesson } = require('../../models/lesson')

router.get('/', async (req, res) => {
    const lessons = await Lesson.find()
    res.send("GET /api/lessons", lessons)
})

router.post('/', async (req, res) => {
    const { error } = validateLesson(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let lesson = new Lesson({
        title: req.body.title,
        content: req.body.content
    })
    
    lesson = await lesson.save()
    res.send(lesson)
})

module.exports = router