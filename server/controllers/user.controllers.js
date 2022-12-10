const createError = require('http-errors')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  registerUser: async (req, res, next) => {
    const { password } = req.password
    try {
      const { username, password } = req.body

      // check if user with the email exists
      const userExist = await User.findOne({ username: username })

      if (userExist) throw createError.Conflict(`The username: ${username} is already taken`)

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = new User({
        username,
        password: hashedPassword
      })

      const user = await newUser.save()

      const token = await jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
      )

      res.status(201).json({
        user,
        token
      })

    } catch (error) {
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body

      const userExists = await User.findOne({ username: username })

      if (!userExists) throw createError('Username and/or password invalid')

      // compare passwordrd
      const passwordMatched = await bcrypt.compare(password, userExists.password)

      if (!passwordMatched) throw createError('Username and/or password invalid')

      const token = jwt.sign({ id: userExists._id }, process.env.SECRET_KEY, { expiresIn: '24h' })

      res.status(200).json({ ...userExists._doc, token })

    } catch (error) {
      next(error)
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      res.json('All users')
    } catch (error) {
      next(error)
    }
  },

  getOneUser: async (req, res, next) => {
    try {
      res.json('A single user here!')
    } catch (error) {
      next(error)
    }
  }
}