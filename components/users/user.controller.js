const createError = require("http-errors");
const { comparePassword } = require("../../utils/password");
const { generateToken } = require("../../utils/token");
const {
  existsUserService,
  registerUserService,
  findUserByEmailService,
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

module.exports = { registerUser, loginUser };
