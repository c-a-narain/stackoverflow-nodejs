const {
  add,
  update,
  read,
  search,
  deletePost,
} = require("../controller/post-controller");
const { postValidator } = require("../middleware/validator");

const postRoutes = require("express").Router();

postRoutes.post("/add", postValidator, add);
postRoutes.post("/update", update);
postRoutes.post("/delete", deletePost);
postRoutes.get("/read", read);
postRoutes.get("/search", search);

module.exports = postRoutes;
