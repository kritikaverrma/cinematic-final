/******all the required imports are in the same file***/
const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const promisifiedJWTSign = promisify(jwt.sign);
const promisifiedJWTVerify = promisify(jwt.verify);
const { JWT_SECRET } = process.env;

// never -> sync in your server
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const signupController = async function (req, res) {
  try {
    // add it to the db
    const userObject = req.body;
    //   data -> req.body
    let newUser = await UserModel.create(userObject);
    // send a response
    res.status(201).json({
      message: "user created successfully",
      user: newUser,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: "success",
    });
  }
};
const loginController = async function (req, res) {
  try {
    /***
     * 1. enable login -> tell the client that user is logged In
     *      a. email and password
     **/

    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      let areEqual = await bcrypt.compare(password, user.password);
      if (areEqual) {
        // user is authenticated
        /* 2. Sending the token -> people remember them
         * */
        // payload : id of that user
        let token = await promisifiedJWTSign({ id: user["_id"] }, JWT_SECRET);
        console.log("sending token from login wrapped in cookie");
        res.cookie("JWT", token, {
          maxAge: 90000000,
          httpOnly: true,
          path: "/",
        });
        res.status(200).json({
          status: "success",
          message: {
            name: user.name,
            email: user.email,
            userId: user._id,
          },
        });
      } else {
        res.status(404).json({
          status: "failure",
          message: "email or password is incorrect",
        });
      }
    } else {
      res.status(404).json({
        status: "failure",
        message: "user not found with creds",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failure",
      message: err.message,
    });
  }
};
const logoutController = function (req, res) {
  res.cookie("JWT", JWT_SECRET, { maxAge: Date.now(), httpOnly: true, path: "/" });

  res.status(200).json({
      status: "success",
      message: "user logged out "
  })
}

/*****************middleware**********************/
const protectRouteMiddleWare = async function (req, res, next) {
  console.log("in the middleware");
  try {
    let jwttoken = req.cookies.JWT;
    if (!jwttoken) throw new Error("UnAuthorized!");
    if (jwttoken) console.log("token received");

    let decryptedToken = await promisifiedJWTVerify(jwttoken, process.env.JWT_SECRET);

    if (decryptedToken) {
      let userId = decryptedToken.id;
      // adding the userId to the req object
      req.userId = userId;
      console.log("authenticated");
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  protectRouteMiddleWare,
};
