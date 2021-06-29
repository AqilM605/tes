const logging = require('../middleware/logging');
const handlingErr = require('../middleware/handlingError');
const router = require('express').Router()
const auth = require('../middleware/auth')


module.exports = (app) => {

  const groupController = require('../controllers/group.controller')


  //middleware to show time, path, and method
  router.all('*', logging.logRequest)


// Getting all groups
  router.get("/",logging.logRequest,handlingErr.checkIfEmptyBody,auth.auth_jwt, groupController.get)

// Getting one group
  router.get("/:id",logging.logRequest,handlingErr.checkIfEmptyBody, groupController.getById)


// Registering group
  router.post("/", handlingErr.checkIfEmptyBody, groupController.create);

// Updating group
  router.patch("/:id", handlingErr.checkIfEmptyBody, groupController.update);

// Deleting group
  router.delete("/:id", groupController.delete);


  app.use('/api/group', router);
}


