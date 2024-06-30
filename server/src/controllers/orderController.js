const Order = require('../models/Order')
const User = require('../models/User')
const ApiError = require('../error/ApiError')
const {USER, ORDER} = require("../constants/models");


const create = async (req, res, next) => {
  try {
    const {products, totalAmount, status} = req.body;
    const user = await User.findById(req.user._id)

    if (!user) {
      return next(ApiError.notFound('User not found'))
    }

    const newOrder = new Order({
      user: req.user._id,
      products,
      totalAmount,
      address: user.address,
      status
    });

    await newOrder.save();
    res.json(newOrder)
  }
  catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

const getAll = async (req,res,next) => {
  try{
    const orders = await ORDER.find().populate('products.product');
    res.json(orders);
  }
  catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

const getById = async (req,res,next) => {
  try{
    const order = await Order.findById(req.params._id);
    if (!order) {
      return next(ApiError.notFound('Order not found'));
    }
    res.json(order);
  }
  catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

const updateStatus = async (req, res, next) => {
  try{
    const {status} = req.body;
    const order = await Order.findById(req.params._id);
    if (!order) {
      return next(ApiError.notFound('Order not found'));
    }

    order.status = status;
    await order.save();
    res.json(order)
  }
  catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

const deleteOne = async (req, res, next) => {
  try{
    const deletedOrder = await Order.findByIdAndDelete(req.params._id);
    if (!deletedOrder) {
      return next(ApiError.notFound('Order not found'))
    }
    res.json({message: 'Order deleted'})
  }
  catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

module.exports = {
  create,
  getAll,
  getById,
  updateStatus,
  deleteOne
}