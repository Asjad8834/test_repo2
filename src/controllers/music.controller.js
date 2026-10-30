const musicModel = require("../models/musicModel");

const albumModel = require("../models/albumModel");

const jwt = require("jsonwebtoken");

const { uploadFile } = require("../services/storage.service");

/**
 * @description CreateMusic --> takes parameter[uri, title, file]
 * @route POST /api/music/createMusic
 */
async function createMusic(req, res){
  try{

    // if user is authorized from teh middleware check then we do

    const { title } = req.body;
    const file = req.file;

    if(!file){
      return res.status(400).json({
        success: false,
        message:"Music file required"
      })
    }

    if(!title){
      return res.status(400).json({
        success: false,
        message:"Title is required"
      })
    }

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: req.user.id,
      // we can access using req.user because we had stored the decoded token in req.user in the middleware
    })

    return res.status(201).json({
      success: true,
      message:"Music created successfully",
      music:{
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      }
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



module.exports = { createMusic };