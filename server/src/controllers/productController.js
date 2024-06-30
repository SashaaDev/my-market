const Product = require('../models/Product')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

const getAll = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(201).send(products)
  } catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

const create = async (req,res,next) => {
  try{
    const {title,description,price, category, stock} = req.body;

    const{imageUrl} = req.files
    let filename = uuid.v4() + '.jpg';
    imageUrl.mv(path.resolve(__dirname, '..','static', filename))

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      imageUrl: filename,
      stock
    })
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

module.exports = {
  getAll,
  create
}