const asyncHandler = require("../middlewares/async");
const { User, Token } = require("../models/user.model");
const ErrorResponse = require("../utils/ErrorResponse");
const { sendEmail } = require("../utils/nodemailer");
const response = require("../utils/response");
const { EMAIL_MESSAGES } = require("../utils/constants");

// @desc      Create user
// @route     POST /user
// @access    Private

exports.registerUser = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  try {
    if (user) {
      return next(
        new ErrorResponse(
          `User with email "${req.body.email}" already exists`,
          400
        )
      );
    } else {
      user = await User.create(req.body);
      await user.save();

      const token = await user.getSignedJwtToken();

      const verificationToken = new Token({
        email: user.email,
        token,
      });

      await verificationToken.save();

      // Send verification email

      const subject = EMAIL_MESSAGES.EMAIL_VERIFICATION.subject;
      const message = EMAIL_MESSAGES.EMAIL_VERIFICATION.message(token);
      await sendEmail(user.email, subject, message);

      return response(res, 201, user);
    }
  } catch (err) {
    return next(new ErrorResponse("Server error", 500));
  }
});

// @desc      Verify email using token
// @route     GET /verify/:token
// @access    Private

exports.verifyEmail = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.params;

    // Retrieve token from DB

    const verificationToken = await Token.findOne({ token });
    if (!verificationToken)
      return next(new ErrorResponse("Invalid or expired token", 400));

    const user = await User.findOne({ email: verificationToken.email });
    if (user) {
      user.isVerified = true;
      await user.save();

      // Delete the token document after successful verification
      await verificationToken.deleteOne();

      return response(res, 200);
    }

    return next(new ErrorResponse("User not found", 400));
  } catch (err) {
    return next(new ErrorResponse("Server error", 500));
  }
});
