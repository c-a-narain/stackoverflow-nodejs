const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

const promisePool = pool.promise();

const queryExecuter = async (sqlst, values) => {
  try {
    const [err, result] = await promisePool.query(sqlst, values);
    return [err, result];
  } catch (err) {
    console.log(err);
  }
};

const queryRunner = async (sqlst) => {
  try {
    const [result] = await promisePool.query(sqlst);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { queryExecuter, queryRunner };
