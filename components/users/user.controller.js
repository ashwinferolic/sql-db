const createError = require("http-errors");
const { comparePassword } = require("../../utils/password");
const { generateToken } = require("../../utils/token");
const {
  existsUserService,
  registerUserService,
  findUserByEmailService,
  findUserByIdService,
  deleteUserByIdService,
  updateUserByIdService,
  resetPasswordService,
  getUsersListService,
  deleteUsersListService,
} = require("./user.service");

// register user
const registerUser = async (req, res, next) => {
  try {
    let user = await existsUserService(req, res, next);
    if (user) {
      next(createError(400, "User already exists"));
    } else {
      let data = await registerUserService(req, res, next);
      if (data) {
        return res
          .status(201)
          .json({ message: "account registered successfully", data });
      }
    }
  } catch (error) {
    next(error);
  }
};

// login user
const loginUser = async (req, res, next) => {
  try {
    let user = await findUserByEmailService(req, res, next);
    if (user && (await comparePassword(req.body.password, user.password))) {
      let token = generateToken(user._id, user.email, user.role);
      let data = {
        user,
        token,
      };
      return res.status(200).json({ message: "Login success", data });
    } else {
      next(createError(400, "Invalid username or password"));
    }
  } catch (error) {
    next(error);
  }
};

// get user by id
const getUserById = async (req, res, next) => {
  try {
    let user = await findUserByIdService(req, res, next);
    if (user) {
      return res.status(200).json(user);
    } else {
      next(createError(404, "User not found /api/users/user_id"));
    }
  } catch (error) {
    next(error);
  }
};

// update user by id
const updateUserById = async (req, res, next) => {
  try {
    let user = await updateUserByIdService(req, res, next);
    if (user) {
      return res.status(200).json({ message: "User have been updated", user });
    } else {
      next(createError(404, "User not found /api/users/user_id"));
    }
  } catch (error) {
    next(error);
  }
};

// delete user by id
const deleteUserById = async (req, res, next) => {
  try {
    let user = await deleteUserByIdService(req, res, next);
    if (user) {
      return res.status(202).json({ message: "User have been deleted" });
    } else {
      next(createError(404, "User not found /api/users/user_id"));
    }
  } catch (error) {
    next(error);
  }
};

// reset password
const resetPassword = async (req, res, next) => {
  try {
    let user = await resetPasswordService(req, res, next);
    if (user) {
      return res
        .status(200)
        .json({ message: "Password have been updated", user });
    } else {
      next(createError(404, "Invalid user details"));
    }
  } catch (error) {
    next(error);
  }
};

// users list
const getUsersList = async (req, res, next) => {
  try {
    let data = await getUsersListService(req, res, next);
    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUsersList = async (req, res, next) => {
  try {
    let data = await deleteUsersListService(req, res, next);
    if (data) {
      res.status(200).json({ message: "User data have been deleted", data });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  deleteUserById,
  updateUserById,
  resetPassword,
  getUsersList,
  deleteUsersList,
};
