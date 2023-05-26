const express = require("express");
const app = express();
const mysql = require("mysql2");
const MD5 = require("md5");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

const errorHandler = require("../helpers/error-handler");
const { queryRunner } = require("../utils/connection");
const { tokenGenerator } = require("../middleware/jwt-validation");
const { responsefunc, responseDisplay } = require("../helpers/response");

const login = async (req, res) => {
  const { EMAIL, PASSWORD } = req.body;

  try {
    const values = [[EMAIL, PASSWORD]];
    const email = await queryRunner(
      "SELECT Email FROM USER3 WHERE Email = '" + EMAIL + "';"
    );

    if (email == undefined) {
      return console.error();
    } else {
      const pswd = await queryRunner(
        "SELECT Password FROM USER3 WHERE EMAIL = '" + EMAIL + "';"
      );

      if (MD5(PASSWORD) === pswd[0].Password) {
        const tk = await tokenGenerator(req.body);
        console.log(tk);

        await responseDisplay(201, true, "Login Successfull",tk, res);
      }
    }
    return;
  } catch (err) {
    console.log(err);
    new errorHandler(401, false, err.message, {}, res);
  }
};

module.exports = { login };
