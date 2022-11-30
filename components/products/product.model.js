const sequelize = require("../../config/db");
const { DataTypes } = require("sequelize");

const Product = sequelize.define("product", {
  productName: {
    type: DataTypes.STRING,
  },
  productCode: {
    type: DataTypes.STRING,
  },
  dosageForm: {
    type: DataTypes.STRING,
  },
  packingForm: {
    type: DataTypes.STRING,
  },
  packingSize: {
    type: DataTypes.INTEGER,
  },
  weight: {
    type: DataTypes.STRING,
  },
  molecules: {
    type: DataTypes.STRING,
  },
  saltGroup: {
    type: DataTypes.STRING,
  },
  MRP: {
    type: DataTypes.INTEGER,
  },
  priceToCustomer: {
    type: DataTypes.INTEGER,
  },
  discountFromMRP: {
    type: DataTypes.INTEGER,
  },
  taxPercentage: {
    type: DataTypes.INTEGER,
  },
  stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  prescriptionRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  discount: {
    type: DataTypes.JSON,
  },
  images: {
    type: DataTypes.JSON,
  },
});

module.exports = Product;
