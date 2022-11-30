const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
  deleteUserById,
  updateUserById,
  resetPassword,
  getUsersList,
  deleteUsersList,
} = require("./user.controller");
const { validate } = require("../../middlewares/joi.middleware");
const {
  registerUserSchema,
  loginUserSchema,
  userSchema,
  resetPasswordSchema,
} = require("./user.validation");

router.post("/register", validate(registerUserSchema), registerUser);
router.post("/login", validate(loginUserSchema), loginUser);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);

// users list
router.get("/list", getUsersList);
router.delete("/list", deleteUsersList);

// get by id
router.get("/details/:id", getUserById);
router.put("/details/:id", validate(userSchema), updateUserById);
router.delete("/details/:id", deleteUserById);

module.exports = router;
