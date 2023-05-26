const errorHandler = require("../helpers/error-handler");
const { loginSchema, postSchema } = require("../model/schema");

const loginValidator = (req, res, next) => {
  const result = loginSchema.validate(req.body);

  if (result.error) {
    new errorHandler(401, false, err.message, {}, res);
  } else {
    next();
  }
};

const postValidator = (req, res, next) => {
  const result = postSchema.validate(req.body);

  if (result.err) {
    new errorHandler(401, false, err.message, {}, res);
  } else {
    next();
  }
};

module.exports = { loginValidator, postValidator };
