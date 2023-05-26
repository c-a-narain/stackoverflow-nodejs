const express = require("express");
const app = express();
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

const { queryExecuter, queryRunner } = require("../utils/connection");
const { check } = require("../middleware/jwt-validation");
const { responsefunc, responseDisplay } = require("../helpers/response");
const { errorHandler } = require("../helpers/error-handler");

const add = async (req, res) => {
  const { POSTID, ANSWER } = req.body;

  try {
    const values = [[POSTID, ANSWER]];

    const token = await req.headers.authorization.split(" ")[1];
    var decode = await check(token);
    const UID = await queryRunner(
      "SELECT UserId FROM USER3 WHERE EMAIL = '" + decode.EMAIL + "';"
    );
    values[0].unshift(UID[0].UserId);

    if (decode) {
      const sqlst = "INSERT INTO ANSWER3 (UserId,PostId,Answer) VALUES (?)";

      await queryExecuter(sqlst, values);

      await responseDisplay(
        201,
        true,
        "Your response has been recorded",
        req.body,
        res
      );
      console.log({
        success: true,
      });
    } else {
      console.log("Error");
    }
    return;
  } catch (err) {
    console.log(err);
    new errorHandler(401, false, err.message, {}, res);
  }
}; //post Answer

const search = async (req, res) => {
  const { TITLE } = req.body;
  const TAG = req.query.TAG;

  try {
    const values = [[TITLE]];
    const sqlst =
      "SELECT p.PostId,p.Title,p.Description,p.Tag, a.AnswerId,a.Answer,a.AnsweredOn FROM ANSWER3 a INNER JOIN POST3 p ON p.PostId = a.PostId WHERE Title LIKE '%"+TITLE+"%' OR TAG LIKE '%"+TAG+"%'";
    const read = await queryRunner(sqlst);

    console.log({
      success: true,
    });

    await responseDisplay(201, true, "Search Results", read, res);

    return;
  } catch (err) {
    console.log(err);
    new errorHandler(401, false, err.message, {}, res);
  }
};

module.exports = { add, search };
