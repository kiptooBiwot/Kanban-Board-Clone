const { schemaOptions } = require('./modelOptions')
const { Schema, model } = require('mongoose')

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, schemaOptions)


module.exports = model('User', userSchema)