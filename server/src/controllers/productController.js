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
    const id = req.params.id
    const product = await Product.findById(id)
    if (!product) {
      return next(ApiError.notFound('Product not found'))
    }
    res.json(product)
  } catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

const getByForeignId = async (req, res, next) => {
  try {
    const category = req.params.category;
    if (!category) {
      return next(ApiError.badRequest('Category query parameter is required'));
    }
    if (!Object.values(CATEGORIES).includes(category)) {
      return next(ApiError.badRequest('Invalid category specified'));
    }
    const products = await Product.findByCategory(category);
    res.json(products);
  } catch (error) {
    next(ApiError.internal('Internal server error'));
  }
};

const create = async (req, res, next) => {
  try {
    const {title, description, price, category, imageUrl, stock} = req.body;
    if (!Object.values(CATEGORIES).includes(category)) {
      return next(ApiError.badRequest('Invalid category specified'))
    }
    if (!imageUrl) {
      return next(ApiError.badRequest('Image URL is required'));
    }
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      imageUrl,
      stock
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error)
    next(ApiError.internal('Internal Server Error'));
  }
}

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Product.findOneAndUpdate({_id: id}, req.body, {new: true});
    if (!updatedProduct) {
      return next(ApiError.internal('Product not found'));
    }
    res.json(updatedProduct);
  } catch (error) {
    next(ApiError.internal('Internal server error'));
  }
};

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
  getByForeignId,
  create,
  update,
  deleteOne
}