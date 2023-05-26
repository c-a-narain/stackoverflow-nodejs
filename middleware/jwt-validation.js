const jwt = require("jsonwebtoken");
const { login } = require("../controller/user-controller");
require("dotenv");

async function tokenGenerator(data) {
  const token = jwt.sign(
    {
      EMAIL: data.EMAIL,
    },
    `${process.env.secretKey}`
  );
  return token;
}

async function check(tokenData) {

  let decoded = jwt.verify(tokenData, `${process.env.secretKey}`);
  return decoded;
}

module.exports = { tokenGenerator, check };
