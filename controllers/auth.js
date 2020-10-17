const { validationResult } = require("express-validator/check");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
          password: hashPw,
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

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({
        email: email
    })
        .then(user => {
            if (!user) {
                const error = new Error(
                    "User not found"
                );
                error.statusCode = 401;
                error.data = [];
                throw error;
            }
            loadedUser = user;
            console.log({password, 'user_password': user.password})
            return bcrypt.compare(password, user.password)
        })
    .then(isEql => {
        if (!isEql) {
                const error = new Error("Wrong password");
                error.statusCode = 401;
                error.data = [];
                throw error;
        }
        const token = jwt.sign(
                        {
                            email: loadedUser.email,
                            userId: loadedUser._id.toString(),
                        },
                        'somesupersecret',
                        { expiresIn: '1h' }
        )
        res.status(200).json({token: token, userId: loadedUser._id})
        })
        .catch(err => {
            if (!err.statusCode) {
            err.statusCode = 500;
            }
            next(err);
        });
}