const mongoose = require('mongoose')
const {v4: uuidv4} = require('uuid')
const MODELS = require('../constants/models')

const basketSchema = new mongoose.Schema({
  _id: {type: String, default: uuidv4},
  user: {type: String, ref: MODELS.USER, required: true},
  totalAmount: {type: Number, required: true},
  products: [
    {
      product: {type: String, ref: MODELS.PRODUCT, required: true},
      quantity: {type: Number, required: true}
    }
  ],
  createdAt: {type: Date, default: Date.now}
})

basketSchema.statics.findByUser = function (user) {
  return this.find({ user });
}
const Basket = mongoose.model(MODELS.BASKET, basketSchema)

module.exports = Basket