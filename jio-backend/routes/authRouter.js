const express = require("express");
const {
  signupController,
  loginController,
  logoutController,
} = require("../controller/authController");
const authRouter = express.Router();

//Route: /api/auth/{}
authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);

module.exports = authRouter;
