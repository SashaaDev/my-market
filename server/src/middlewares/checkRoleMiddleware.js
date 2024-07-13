const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
module.exports = function (roles) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return next(ApiError.unauthorized('Unauthorized'))
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (!roles.includes(decoded.role)) {
        return next(ApiError.forbidden('Access denied'))
      }

      req.user = decoded;
      next()
    } catch (error) {
      next(ApiError.internal('Internal server error'))
    }
  }
}