const {logError} = require("../logger");

const errorHandler = (err, req, res, next) => {
  logError("[ERROR]", {data: err});
  console.debug(err);
  res.json({status: "INTERNAL_SERVER_ERROR"});
};

module.exports = errorHandler;
