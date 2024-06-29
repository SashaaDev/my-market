const mongoose = require('mongoose')
const {v4: uuidv4} = require('uuid')
const MODELS = require('../constants/models')

const basket = new mongoose.Schema({
  _id: {type: String, default: uuidv4},
  user: {type: String, ref: MODELS.USER, required: true},
  totalAmount: {type: Number, required: true},
  products: [
    {
      product: {type: mongoose.Schema.Types.ObjectId, ref: MODELS.PRODUCT, required: true},
      quantity: {type: Number, required: true}
    }
  ],
  createdAt:{type:Date, default:Date.now}
})

const Basket = mongoose.model(MODELS.BASKET, basket)

module.exports = Basket