const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    return res.status(err.status).send(err.message);
  }

  return res.status(500).send('Something went wrong');
};
