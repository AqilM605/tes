const passport = require('passport');
exports.auth_jwt = passport.authenticate('jwt', {session: false})
// exports.auth_signup = passport.authenticate('signup', {session: false})

