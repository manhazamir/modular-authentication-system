const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("./async");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.access_token) {
    token = req.cookies.access_token;
  }

  if (!token) {
    return next(new ErrorResponse("Unauthorized", 400));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);

    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorResponse("Unauthorized", 401));
  }
});

module.exports = { protect };
