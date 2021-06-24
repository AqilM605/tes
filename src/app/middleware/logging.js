
exports.logRequest = (req, res, next) => {
  let date = new Date(Date.now()).toLocaleString().split(',');
  // prints time, url, method
  console.log(
    `At: ${date[0]} ${date[1]} \n URL: transaction${req.path} \n Method: ${req.method}`
  );
  next();
};
