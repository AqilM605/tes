const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user.model');
;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//
// passport.use(
//   'signup',
//   new localStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//       passReqToCallback: true,
//     },
//     async (req, username, password, done) => {
//
//       try {
//         const user = {"password": password, "username": username};
//         return done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );


passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        await console.log(email)
        const user = await UserModel.findOne({email});

        if (!user) {
          return done(null, false, {message: 'User not found'});
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {message: 'Wrong Password'});
        }

        return done(null, user, {message: 'Logged in Successfully'});
      } catch (error) {
        return done(error);
      }
    }
  )
);


passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SIGN_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {

      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);




