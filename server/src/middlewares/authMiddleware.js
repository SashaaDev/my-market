const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

const authToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(ApiError.unauthorized('Token not provided'))
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(ApiError.unauthorized('Invalid token'))
    }
    req.user = user;
    next()
  })
}
module.exports = authToken