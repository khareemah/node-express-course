// const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, please try again later',
  };

  //  if (err instanceof CustomAPIError) {
  //    return res.status(err.statusCode).json({ msg: err.message });
  //  }

  // Validation error - custom error if user or job is missing a field
  if (err.name === 'ValidationError') {
    customError.statusCode = 400;
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
  }

  // Duplicate error - using same email to register twice
  if (err.code && err.code === 11000) {
    customError.statusCode = 400;
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
  }

  // cast error
  if (err.name === 'CastError') {
    customError.statusCode = 404;
    customError.message = `No item found with id ${err.value}`;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
