const errorHandlerMiddleware = (err, req, res, next) => {
  return res
    .status(500)
    .json({ msg: 'Something went wrong!! Try again later!!!' });
};

module.exports = errorHandlerMiddleware;
