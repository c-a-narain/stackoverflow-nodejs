const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

const loginSchema = Joi.object({
  EMAIL: Joi.string().email().lowercase().required(),
  PASSWORD: Joi.string().min(4).required(),
});

const postSchema = Joi.object({
  Title: Joi.string().required(),
  Description: Joi.string().required(),
  Tag: Joi.string().required(),
});

module.exports = { loginSchema, postSchema };
