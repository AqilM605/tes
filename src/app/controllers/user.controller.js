const User = require("../models/user.model");

// Getting all user
exports.get = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.json({message: "empty records"}
      )
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({message: err.message});
  }

}

// Getting one user
exports.getById = async (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({message: `Can not found User with id= ${id}`});
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occured while find User with id= ${id}`,
      });
    });
}


// Registering user
exports.create = async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    dateOfBirth: req.body.dateOfBirth

  });


 User.find({"email": req.body.email})
    .then(async (data) => {
      if (data.length) {
        res.status(400).json({message: "email already exists"});
      } else {
        const newUser = await user.save();

        res.status(201).json(newUser);
      }
    }).catch((error) => {
      res.status(500).json({message: error.message});

    })


}

//update a user by id
exports.update = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, {useFindAndModify: false, new: true})
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id= ${id}. Failed to find user with that id`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating user with id= ${id}`,
      });
    });
}

// HARD Delete a user by id
exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id= ${id}. Maybe Transaction was not found!`,
        });
      } else {
        res.send({
          message: 'user was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete user with id= ${id}`,
      });
    });


}


