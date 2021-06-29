const Group = require("../models/groups.model");

// Getting all Group
exports.get = async (req, res) => {
  try {
    const groups = await Group.find();
    if (groups.length==0) {
      res.status(200).json({message: "empty records"})
    }
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({message: err.message});
  }

}

// Getting one Group
exports.getById = async (req, res) => {
  const id = req.params.id;
  Group.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({message: `Can not found Group with id= ${id}`});
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occured while find Group with id= ${id}`,
      });
    });
}


// Create Group
exports.create = async (req, res) => {
  const group = new Group({
    groupName: req.body.groupName,
    groupType: req.body.groupType,
  });


  await group.save().then((newUser) => res.status(201).json(newUser))
    .catch((error) => {
      res.status(500).json({message: error.message});
    })


}

//update a Group by id
exports.update = (req, res) => {
  const id = req.params.id;
  Group.findByIdAndUpdate(id, req.body, {useFindAndModify: false, new: true})
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Group with id= ${id}. Failed to find Group with that id`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Group with id= ${id}`,
      });
    });
}

// HARD Delete a Group by id
exports.delete = (req, res) => {
  const id = req.params.id;
  Group.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Group with id= ${id}. Maybe Transaction was not found!`,
        });
      } else {
        res.send({
          message: 'Group was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete Group with id= ${id}`,
      });
    });


}


