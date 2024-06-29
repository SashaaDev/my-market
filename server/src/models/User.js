const mongoose = require('mongoose')
const {v4: uuidv4} = require('uuid')
const USER_ROLES = require('../constants/userRoles')
const MODELS = require('../constants/models')

const user = new mongoose.Schema({
  _id: {type: String, default: uuidv4},
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  address: {type: String, required: true},
  role: {type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.CUSTOMER},
  createdAt: {type: Date, default: Date.now}
})

const User = mongoose.model(MODELS.USER, user)

module.exports = User