// we ere repeating checking credentials part for both createMusic and createAlbum so we can create a middleware for that

const jwt = require("jsonwebtoken");

/**
 * @description Middleware to check whether the user is artist or not
 */
async function authArtist(req, res, next){
  try{

    // Check the token
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    // If token is not present
    if(!token){
      return res.status(401).json({
        success: false,
        message:"Unauthorized access"
      })
    }

    // Check the role assigned during token creation
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(decoded.role !== "artist"){
      return res.status(403).json({
        success: false,
        message:"You do not have access"
      })
    }

    // When all conditions are met we will go to the next step

    // We are making a property req.user and assigning the decoded token to it, so that in the controller we can access the user information from req.user

    req.user = decoded;

    next();

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message:"Internal Server Error",
      error: error.message
    })
  }
}

/**
 * @description Middleware to check when the user is a nrmal user
 */
async function authUser(req, res, next){
  try{

    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if(!token){
    return res.status(401).json({message:"Unauthorized"});
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(decoded.role !== "user"){
      return res.status(403).json({message:"You dont have access"})
    }

    req.user = decoded;

    next();

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message:"Internal server error",
      error: error.message
    })
  }
}


module.exports = { authArtist, authUser };