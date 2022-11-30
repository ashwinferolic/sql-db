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

// find user by id
const findUserByIdService = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { id: req.params.id } });
    return user;
  } catch (error) {
    next(error);
  }
};

// update user by id
const updateUserByIdService = async (req, res, next) => {
  try {
    await User.update(
      {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
      },
      { where: { id: req.params.id } }
    );
    let user = await User.findOne({ where: { id: req.params.id } });
    return user;
  } catch (error) {
    next(error);
  }
};

// delete user by id
const deleteUserByIdService = async (req, res, next) => {
  try {
    let user = await User.destroy({ where: { id: req.params.id } });
    return user;
  } catch (error) {
    next(error);
  }
};

// reset password
const resetPasswordService = async (req, res, next) => {
  try {
    let user = await User.update(
      {
        password: req.body.password,
      },
      {
        where: {
          [Op.and]: [
            { email: req.body.email },
            { mobileNumber: req.body.mobileNumber },
          ],
        },
      }
    );
    return user;
  } catch (error) {
    next(error);
  }
};

// get user list
const getUsersListService = async (req, res, next) => {
  try {
    let cmd = {};
    if (req.query.role) {
      cmd.role = req.query.role;
    }
    let data = await User.findAll({ where: cmd });
    return data;
  } catch (error) {
    next(error);
  }
};

// delete users list
const deleteUsersListService = async (req, res, next) => {
  try {
    await User.destroy({ where: {}, truncate: true });
    let data = User.findAll();
    return data;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  existsUserService,
  registerUserService,
  findUserByEmailService,
  findUserByIdService,
  deleteUserByIdService,
  updateUserByIdService,
  resetPasswordService,
  getUsersListService,
  deleteUsersListService,
};
