const { validationResult } = require("express-validator/check");
const User = require('../models/user')


exports.postSignUp = (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect");
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
      }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

};