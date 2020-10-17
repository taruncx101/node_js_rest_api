const express = require("express");
const router = express.Router();
const User = require('../modes/user')

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
           .isEmpty(),

    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .trim(),

    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.postSignUp
);


module.exports = router;
