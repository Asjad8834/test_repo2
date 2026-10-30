const express = require("express");

const authRouter = express.Router();

const authController = require("../controllers/auth.controller");


/**
 * @description Registering a user--> takes parameter[username, email,password]
 * @route POST /api/auth/register
 * @access public
 */
authRouter.post("/register", authController.registerUser);

/**
 * @description Login a user--> takes parameter[email, password]
 * @route POST /api/auth/login
 * @access public
 */
authRouter.post("/login", authController.loginUser);

/**
 * @description Logout a user--> takes parameter[none]
 * @route POST /api/auth/logout
 * @access public
 */
authRouter.post("/logout", authController.logoutUser);


module.exports = authRouter;