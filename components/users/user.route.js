const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("./user.controller");
const { validate } = require("../../middlewares/joi.middleware");
const { registerUserSchema, loginUserSchema } = require("./user.validation");

router.post("/register", validate(registerUserSchema), registerUser);
router.post("/login", validate(loginUserSchema), loginUser);

module.exports = router;
