const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
require('./utilities/db.init')

const app = express()

const PORT = process.env.PORT || 5500

// Routes
const userRoutes = require('./routes/user.routes')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))


// Endpoint
app.use('/api/v1/users', userRoutes)

// Error

// Init server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
})