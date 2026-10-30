const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
 

/**
 * @description Register a user-->[username, email,password]
 * @route POST /api/auth/register
 */
async function registerUser(req, res){
  try{

    const { username, email, password } = req.body;

    //Now we will check whether this user already exists or not
    const userAlreadyExists = await userModel.findOne({
      $or:[
        {username}, {email}
      ]
    });

    if(userAlreadyExists){
      return res.status(409).json({
        success:"false",
        message:"User already exists",
      })
    }

    //Now that the user already exists we will hash their password

    const hash = await bcrypt.hash(password, 10);

    // We will now create that user
    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    // We will now assign a token to this user
    const token = jwt.sign({
      id: user._id,
      role: user.role
    }, process.env.JWT_SECRET);

    // Set this token in the cookies
    res.cookie("token", token);

    // Send the final response to the user
    return res.status(201).json({
      success: true,
      message:"User registered Sucessfully",
      user:{
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token: token
    })

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message:"Internal server error",
      error: error.message
    })
  }
}


module.exports = { registerUser };