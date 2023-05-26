const { responseDisplay } = require("../helpers/response");

class errorHandler extends Error {
  constructor(statusCode, success, message, data, res) {
    super(message);
    responseDisplay(statusCode, success, message, data, res);
  }
}

module.exports = errorHandler;
