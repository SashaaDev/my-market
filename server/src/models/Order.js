const {v4: uuidv4} = require('uuid')
const mongoose = require('mongoose')
const ORDER_STATUS = require('../constants/orderStatus')
const MODELS = require('../constants/models')

const order = new mongoose.Schema({
  _id: {type: String, default: uuidv4},
  user: {type: String, ref: MODELS.USER, required: true},
  products: [
    {
      product: {type: mongoose.Schema.Types.ObjectId, ref: MODELS.PRODUCT, required: true},
      quantity: {type: Number, required: true}
    }
  ],
  totalAmount: {type: Number, required: true},
  status: {type: String, enum: Object.values(ORDER_STATUS), default: ORDER_STATUS.PENDING},
  createdAt: {type: Date, default: Date.now}
})

const Order = mongoose.model(MODELS.ORDER, order)

module.exports = Order