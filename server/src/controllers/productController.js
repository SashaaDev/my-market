const Product = require('../models/Product')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const CATEGORIES = require('../constants/productCategories')
const getAll = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(201).json(products)
  } catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

const getById = async (req, res, next) => {
  try {
    const product = Product.findOne(req.params._id)
    if (!product) {
      return next(ApiError.notFound('Product not found'))
    }
    res.json(product)
  } catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

const create = async (req, res, next) => {
  try {
    const {title, description, price, category, stock} = req.body;
    if (!Object.values(CATEGORIES).includes(category)) {
      return next(ApiError.badRequest('Invalid category specified'))
    }
    const imageUrl = path.join('uploads', req.file.filename);

    const newProduct = new Product({
      title,
      description,
      price,
      category ,
      imageUrl,
      stock
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    next(ApiError.internal('Internal Server Error'));
  }
}

const update = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(req.params._id, req.body, {new: true})
    if (!updatedProduct) {
      return next(ApiError.internal('Product not found'))
    }
    res.json(updatedProduct)
  } catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}
const deleteOne = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params._id)
    if (!deletedProduct) {
      return next(ApiError.internal('Product not found'))
    }
    res.json({message: 'Product deleted'});
  } catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}
module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne
}