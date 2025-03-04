const express = require("express");
const UserRouter = express.Router();
const {
  getCurrentUser,
  addToWishlist,
  getWishlist,
} = require("../controller/userController");
const { protectRouteMiddleWare } = require("../controller/authController");
/***********routes**************/
/**********users*****/
// Root route--/api/user
//UserRouter.use(protectRouteMiddleWare);
UserRouter.use(protectRouteMiddleWare);
UserRouter.get("/", getCurrentUser);
UserRouter.post("/wishlist", addToWishlist);
UserRouter.get("/wishlist/:userId", getWishlist);



module.exports = UserRouter;
