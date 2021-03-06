//middleware for handling error if req.body empty during post/delete/patch
exports.checkIfEmptyBody = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }
  next();
};
