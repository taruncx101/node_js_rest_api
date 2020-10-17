const express = require("express");
const router = express.Router();
const User = require('../models/user')

const { body } = require("express-validator");

const authController = require("../controllers/auth");


router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("The email already exists.");
          }
        });
      })
          .normalizeEmail(),
      body('name')
          .trim()
           .notEmpty(),

    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .trim(),
  ],
  authController.postSignUp
);
router.post(
  "/login",authController.login
);

module.exports = router;
