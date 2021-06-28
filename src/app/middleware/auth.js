const passport = require('passport');
const Strategy = require('passport-http').DigestStrategy
const User = require("../models/user.model");

exports.auth = passport.authenticate('digest', {session: false})


passport.use(new Strategy({qop: 'auth',usernameField: 'username',
    passwordField: 'password'},
  function (username, cb) {
    console.log(username)
    User.find({userName:username}, function (err, user) {
      console.log(user)
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      return cb(null, user, user.password);
    })
  }));

exports.passport =passport
