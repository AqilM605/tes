const logging = require('../middleware/logging');
const handlingErr = require('../middleware/handlingError');
const router = require('express').Router()
const userController = require('../controllers/user.controller')
module.exports = (app) => {




  //middleware to show time, path, and method
  router.all('*', logging.logRequest)


// Getting all user
  router.get("/",userController.get)

// Getting one user
  router.get("/:id",userController.getById)


// Registering user
  router.post("/",handlingErr.checkIfEmptyBody,userController.create);

// Updating user
  router.patch("/:id", handlingErr.checkIfEmptyBody,userController.update);

// Deleting user
  router.delete("/:id", userController.delete);


  app.use('/api/user', router);
}


