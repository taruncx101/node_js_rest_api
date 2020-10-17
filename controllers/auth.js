const { validationResult } = require("express-validator/check");
const bcrypt = require('bcryptjs')
const User = require('../models/user')


exports.postSignUp = (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt
      .hash(password, 12)
      .then((hashPw) => {
        const user = new User({
          email,
          name,
          paassword: hashPw,
        });
        return user.save();
      })
      .then((result) => {
        res.status(201).json({ messaage: "User creaated", userId: result._id });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });

};