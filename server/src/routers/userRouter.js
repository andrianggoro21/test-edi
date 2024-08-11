const express = require("express");
const { body } = require("express-validator");
const {
  registerUserController,
  getAllUserController,
  loginUserController,
  keepLoginController,
} = require("../controllers/userController");
const validator = require("../middleware/validator.middleware");
const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

const validations = [
  body("email").notEmpty().withMessage("Email cannot be emptied"),
  body("email").isEmail().withMessage("Email format is invalid"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be emptied")
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
];

router.post("/", validator(validations), registerUserController);
router.get("/", getAllUserController);
router.post("/login", loginUserController);
router.get("/keeplogin", verifyToken, keepLoginController);

module.exports = router;
