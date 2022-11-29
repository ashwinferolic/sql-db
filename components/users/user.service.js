const User = require("./user.model");
const { hashPassword } = require("../../utils/password");
const { Op } = require("sequelize");

// check if user exists
const existsUserService = async (req, res, next) => {
  try {
    return await User.findOne({
      where: {
        [Op.or]: [{ userName: req.body.userName }, { email: req.body.email }],
      },
    });
  } catch (error) {
    next(error);
  }
};

// register user
const registerUserService = async (req, res, next) => {
  try {
    let hashedPassword = await hashPassword(req.body.password);
    let data = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      password: hashedPassword,
      address: req.body.address,
    });
    return data;
  } catch (error) {
    next(error);
  }
};

// find user by email
const findUserByEmailService = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    return user;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  existsUserService,
  registerUserService,
  findUserByEmailService,
};
