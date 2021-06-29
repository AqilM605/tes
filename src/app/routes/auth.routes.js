const logging = require('../middleware/logging');
const handlingErr = require('../middleware/handlingError');
const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller");


require('../config/auth.config');

module.exports = (app) => {

  router.post(
    '/signup',logging.logRequest,handlingErr.checkIfEmptyBody
    , authController.register
  );

  router.post(
    '/login',logging.logRequest,handlingErr.checkIfEmptyBody,
    authController.login
  )
  app.use('/api/auth', router);
}
