const express = require("express");

const app = express();


const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes");

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//Routes
app.use("/api/auth", authRouter);


//Default Route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Music App");
})



module.exports = app;