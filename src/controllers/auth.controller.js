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
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    });

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

/**
 * @description Login a user-->[email, password]
 * @route POST /api/auth/login
 */
async function loginUser(req, res){
  try{

    const {email, password} = req.body;
    
    const user = await userModel.findOne({
      email
    });

    // If that user is not present in the database
    if(!user){
      return res.status(401).json({
        success: false,
        message:"User not found"
      })
    }

    // We will check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if(!isPasswordValid){
      return res.status(401).json({
        success: false,
        message:"Invalid credentials"
      })
    }

    // When password is Valid we assign it a token
    const token = jwt.sign({
      id: user._id,
      role: user.role
    }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    })

    // return the res to the user
    
    return res.status(200).json({
      success: true,
      message:"User Logged In Successfully",
      user: user,
      token: token
    })

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message:"Internal Server Error",
      error: error.message
    });
  }
}


/**
 * @description Logout a user-->[none]
 * @route POST /api/auth/logout
 */
async function logoutUser(req, res){
  try{
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message:"User Logged Out Successfully"
    })
  }
  catch(error){
    return res.status(500).json({
      success: false,
      message:"Internal Server Error",
      error: error.message
    })
  }
}


module.exports = { registerUser, loginUser, logoutUser };