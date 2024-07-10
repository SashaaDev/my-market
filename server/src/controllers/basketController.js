const Basket = require('../models/Basket')
const Product = require('../models/Product')
const ApiError = require('../error/ApiError')
const mongoose = require('mongoose')
const getById = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const basket = await Basket.findOne({user: userId}).populate('products.product');
    if (!basket) {
      return next(ApiError.notFound('Basket not found'));
    }
    res.json(basket);
  } catch (error) {
    next(ApiError.internal('Internal server error'));
  }
}

const create = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let basket = await Basket.findOneAndUpdate(
        { user: userId },
        { $setOnInsert: { user: userId, totalAmount: 0, products: [] } },
        { upsert: true, new: true }
    );

    const productIndex = basket.products.findIndex(item => item.product === productId);

    if (productIndex > -1) {
      basket.products[productIndex].quantity += quantity;
    } else {
      basket.products.push({ product: productId, quantity });
    }

    basket.totalAmount += product.price * quantity;

    await basket.save();
    res.status(200).json(basket);
  } catch (error) {
    console.error("Error adding product to basket:", error);
    next(ApiError.internal('Internal server error'));
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;
    let basket = await Basket.findOne({ user: userId });

    if (!basket) {
      return next(ApiError.notFound('Basket not found'));
    }

    const productIndex = basket.products.findIndex(item => item.product.toString() === productId);

    if (productIndex > -1) {
      const product = await Product.findById(productId);
      if (!product) {
        return next(ApiError.notFound('Product not found'));
      }
      basket.products[productIndex].quantity -= quantity;
      basket.totalAmount -= product.price * quantity;
      if (basket.products[productIndex].quantity <= 0) {
        basket.products.splice(productIndex, 1);
      }

      await basket.save();
      res.status(200).json(basket);
    } else {
      return next(ApiError.notFound('Product not found in basket'));
    }
  } catch (error) {
    console.error(error);
    next(ApiError.internal('Internal server error'));
  }
};


const deleteAll = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const basket = await Basket.findOneAndUpdate(
        {user: userId},
        {products: []},
        {new: true}
    );
    if (!basket) {
      return next(ApiError.notFound('Not found'))
    }

    await basket.save()
    res.send(200).json(basket)
  } catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}
module.exports = {
  getById,
  create,
  deleteOne,
  deleteAll
}