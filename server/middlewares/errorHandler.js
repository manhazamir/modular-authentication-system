const { getReasonPhrase } = require("http-status-codes");
const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let error = { ...err };

  error.message = err.message;

  if (err.stack) {
    console.log(err.stack);
  }

  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found for id ${err.value}`, 404);
  } else if (err.code === 11000) {
    error = new ErrorResponse("Duplicate field value entered", 400);
  } else if (err.name === "ValidationError") {
    error = new ErrorResponse(
      Object.values(err.errors).map((val) => val.message),
      400
    );
  } else if (err.error && err.error.isJoi) {
    error = new ErrorResponse(err.error.toString(), 400);
  }

  const status = error.statusCode || 500;
  const reason = getReasonPhrase(status);

  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? reason : error.message,
  });
};

module.exports = errorHandler;
