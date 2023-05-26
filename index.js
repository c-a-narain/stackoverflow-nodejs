const express = require("express");
const app = express();
app.use(express.json());
require("dotenv");

const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const answerRoutes = require("./routes/answer-routes");

app.use("/", userRoutes);
app.use("/post", postRoutes);
app.use("/answer", answerRoutes);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
