const responseDisplay = async (statusCode, success, message, data, res) => {
  const response = {
    message,
    success,
    data,
  };
  res.status(statusCode).send(response);
};

const responsefunc = async (statusCode, success, message, res) => {
  const response = {
    message,
    success,
  };
  res.status(statusCode).send(response);
};

module.exports = { responsefunc, responseDisplay };
