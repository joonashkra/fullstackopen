const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post("/", async (req, res, next) => {
    const { username, name, password } = req.body

    if(!password || password.length < 3) {
        const error = new Error('Password is shorter than the minimum allowed length (3).')
        error.name = 'ValidationError'
        return next(error)
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({ username, name, passwordHash })
    const newUser = await user.save()

    res.status(201).json(newUser)
})


usersRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    res.json(users)
})

module.exports = usersRouter