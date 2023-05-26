const { add, search } = require("../controller/answer-controller");
// const { postValidator } = require("../middleware/validator");

const answerRoutes = require("express").Router();

answerRoutes.post("/add", add);
answerRoutes.get("/search", search);

module.exports = answerRoutes;
