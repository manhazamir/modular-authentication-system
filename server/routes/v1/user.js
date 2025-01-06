const router = require("express").Router();
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const {
  registerUser,
  verifyEmail,
} = require("../../controllers/user.controller");
const { registerSchema } = require("../../validators/users");

router.post("/user", validator.body(registerSchema), registerUser);
router.get("/verify/:token", verifyEmail);

module.exports = router;
