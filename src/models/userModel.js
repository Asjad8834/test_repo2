const mongoose = require("mongoose");
const { kMaxLength } = require("node:buffer");

const userSchema = new mongoose.Schema({

  username:{
    type: String,
    required: [true, "username is required"],
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username cannot exceed 20 characters'],
    unique: true,
    lowercase: true
  },

  email:{
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please enter a valid email"]
  },

  password:{
    type: String,
    required: [true, "password is required"],
    minlength: [5, "Password should be minimum of 5 characters"]
  },

  role:{
    type: String,
    enum:["user", "artist"],
    default: "user"
  },

})

userSchema.set("timestamps", true);
userSchema.index({username: 1, email: 1});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;