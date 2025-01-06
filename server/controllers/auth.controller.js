const asyncHandler = require("../middlewares/async");
const { User, Token } = require("../models/user.model");
const ErrorResponse = require("../utils/ErrorResponse");
const { EMAIL_MESSAGES, EXPIRATION_AT } = require("../utils/constants");
const response = require("../utils/response");
const { sendEmail } = require("../utils/nodemailer");
const generateOtp = require("../utils/generateOtp");
const { cookieOptions } = require("../utils/data");

// @desc      Login user
// @route     POST /login
// @access    Private
exports.login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials"));
    }

    // Generate a verification token

    const otp = generateOtp(6, false);

    const otpToken = new Token({
      email: user.email,
      token: otp,
    });
    await otpToken.save();

    // Send OTP via email

    const subject = EMAIL_MESSAGES.LOGIN_VERIFICATION.subject;
    const message = EMAIL_MESSAGES.LOGIN_VERIFICATION.message(otp);
    await sendEmail(user.email, subject, message);

    return response(res, 200, user.toObject());
  } catch (error) {
    console.error("Error in login:", error);
    return next(new ErrorResponse("Failed to log in. Please try again.", 500));
  }
});

// @desc      Two factor authentication - Login OTP
// @route     POST /verify-otp
// @access    Private

exports.verifyOtp = asyncHandler(async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const otpToken = await Token.findOne({ email }).sort({ createdAt: -1 });

    if (!otpToken)
      return next(new ErrorResponse("OTP Expired or Not found", 400));

    // Check if OTP matches

    if (otpToken.token !== otp) {
      return next(new ErrorResponse("Invalid OTP", 400));
    }

    // Log the user in

    const user = await User.findOne({ email });

    res.cookie("access_token", user.getSignedJwtToken(), cookieOptions);

    await otpToken.deleteOne({ email });

    return response(res, 200, user.toObject());
  } catch (error) {
    return next(
      new ErrorResponse("Failed to verify OTP. Please try again.", 500)
    );
  }
});

// @desc      Logout user
// @route     POST /logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  try {
    // Clear access_token cookie
    res.clearCookie("access_token", cookieOptions);

    return response(res, 200);
  } catch (error) {
    return next(new ErrorResponse("Failed to log out. Please try again.", 500));
  }
});

// @desc      Get current user
// @route     GET /auth/me
// @access    Private
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;

    return response(res, 200, user.toObject());
  } catch (error) {
    return next(new ErrorResponse("Failed to fetch user information.", 500));
  }
});
