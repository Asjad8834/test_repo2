const express = require("express");

const app = express();


const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes");
const musicRouter = require("./routes/music.routes");

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//Routes
/**
 * @description Auth Routes-->[register, login, logout]
 * @route /api/auth
 * @access public
 */
app.use("/api/auth", authRouter);

/**
 * @description Music Routes-->[create, read, update, delete]
 * @route /api/music
 * @access public
 */
app.use("/api/music", musicRouter );


//Default Route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Music App");
})



module.exports = app;