const Basket = require('../models/Basket')
const ApiError = require('../error/ApiError')

const getById = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const basket = await Basket.findOne({user: userId}).populate('products.product');
    if (!bakset) {
      return next(ApiError.notFound('Not found'))
    }
    res.json(basket);
  } catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

const create = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {productId, quantity} = req.body;
    let basket = await Basket.findOne({user: userId})

    if (!basket) {
      basket = new Basket({ user: userId, totalAmount: 0, products: [] });
    }

    const productIndex = basket.products.findIndex(
        item =>
            item.product.toString() === productId
    );

    productIndex > -1 ?
        basket.products[productIndex].quantity += quantity
        :
        basket.products.push({product: productId, quantity})

    await basket.save();
    res.status(200).json(basket)
  } catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

const deleteOne = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {productId, quantity} = req.body;

    let basket = await Basket.findOne({user: userId})
    if (!basket) {
      return next(ApiError.notFound('Not found'))
    }
    const productIndex = basket.products.filter(item => item.products.toString() === productId);

    productIndex > -1 ?
        basket.products[productIndex].quantity -= quantity
        :
        basket.products.splice(productIndex, 1)

    await basket.save()
    res.send(200).json(basket)
  } catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}

const deleteAll = async (req, res, next) => {
  try{
    const userId = req.user._id;
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
  }
  catch (error) {
    next(ApiError.internal('Internal server error'))
  }
}
module.exports = {
  getById,
  create,
  deleteOne,
  deleteAll

}