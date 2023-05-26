const userRouter = require("express").Router();
const { loginValidator } = require("../middleware/validator");
const { login } = require("../controller/user-controller");

userRouter.get("/login", loginValidator, login);

module.exports = userRouter;
