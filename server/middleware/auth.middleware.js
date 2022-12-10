const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    const token = req.header('authorization')

    if (!token) {
      return res.status(401).json({ msg: 'No auth token. Access denied' })
    }

    // Verify token
    const verified = jwt.verify(token, process.env.SECRET_KEY)

    if (!verified) {
      return res
        .status(401)
        .json({ msg: 'Token verification failed, authorization denied' })
    }

    req.user = verified.id
    req.token = token

    next()
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = auth