require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middlewares/error.middleware");

// dbs
const sequelize = require("./config/db");
const User = require("./components/users/user.model");

const app = express();
// sequelize.sync({ force: true });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.use("/api/users", require("./components/users/user.route"));
app.use(errorHandler);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.blue);
});
