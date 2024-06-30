const {v4: uuidv4} = require('uuid')
const mongoose = require('mongoose')
const MODELS = require('../constants/models')
const CATEGORIES = require('../constants/productCategories')
const product = new mongoose.Schema({
  _id: {type: String, default: uuidv4},
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  category: {type: String, required: true, enum:Object.values(CATEGORIES)},
  imageUrl: {type: String, required: true},
  stock: {type: Number, required: true},
  createdAt: {type: Date, default: Date.now},
})

const Product = mongoose.model(MODELS.PRODUCT, product)

module.exports = Product