const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(cors());
const authenticationMiddleware = require("./middleware/authentication");
const taskRoutes = require("./routes/task-route");
const userRoutes = require("./routes/user-route");
app.use(express.static("./public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/auth", userRoutes);
app.use("/task", authenticationMiddleware, taskRoutes);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, console.log(`server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
