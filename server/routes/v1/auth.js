const router = require("express").Router();
const { protect } = require("../../middlewares/auth");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const { loginSchema, tokenSchema } = require("../../validators/auth");

const {
  login,
  logout,
  verifyOtp,
  getCurrentUser,
} = require("../../controllers/auth.controller");

router.post("/login", validator.body(loginSchema), login);
router.post("/verify-otp", validator.body(tokenSchema), verifyOtp);
router.post("/logout", logout);
router.get("/me", protect, getCurrentUser);

module.exports = router;
