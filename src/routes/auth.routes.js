const express = require("express");

const authRouter = express.Router();

const authController = require("../controllers/auth.controller");


/**
 * @description Registering a user--> takes parameter[username, email,password]
 * @route POST /api/auth/register
 * @access public
 */
authRouter.post("/register", authController.registerUser);


module.exports = authRouter;