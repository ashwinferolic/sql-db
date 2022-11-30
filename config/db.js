const Sequelize = require("sequelize");

const sequelize = new Sequelize("admin", "root", process.env.DB_PASSWORD, {
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("SQL database connected successfully..".blue);
  } catch (error) {
    next(error);
  }
};

connectDB();

module.exports = sequelize;
