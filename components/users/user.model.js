const Sequelize = require("sequelize");
const sequelize = require("../../config/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  userName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  mobileNumber: {
    type: DataTypes.BIGINT,
  },
  address: {
    type: DataTypes.JSON,
    street: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
  },
});

module.exports = User;
