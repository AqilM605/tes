

const User = require("../models/user.model");
const passport = require('passport');
const jwt = require('jsonwebtoken');

//Register user
exports.register = async (req, res) => {
  const user = {
    userName: req.body.userName,
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    dateOfBirth: req.body.dateOfBirth
  }

  User.find({"email": req.body.email})
    .then(async (data) => {
      if (data.length) {
        res.status(400).json({message: "email already exists"});
      } else {
        const newUser = await User.create(user);
        res.status(201).json({
          message: 'Signup successful',
          user: newUser
        });
      }
    }).catch((error) => {
    res.status(500).json({message: error.message});

  })
}

  exports.login = async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            {session: false},
            async (error) => {
              if (error) return next(error);

              const body = {_id: user._id, email: user.email};
              const token = jwt.sign({user: body}, process.env.SIGN_KEY);

              return res.json({token});
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }


