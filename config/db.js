const Sequelize = require("sequelize");

const sequelize = new Sequelize("admin", "root", process.env.DB_PASSWORD, {
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
