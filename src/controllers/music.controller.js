const musicModel = require("../models/musicModel");

const albumModel = require("../models/albumModel");

const jwt = require("jsonwebtoken");

const { uploadFile } = require("../services/storage.service");

/**
 * @description CreateMusic --> takes parameter[ title, file]
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

/**
 * @description CreateAlbum --> takes in parameter[title]
 * @route POST /api/music/createAlbum
 * @access private
 */
async function createAlbum(req, res){
  try{

    const { title, musics } = req.body;

    if(!title || !musics || musics.length === 0){
      return res.status(400).json({
        success: false,
        message:"Title and musics are required"
      })
    }

    const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics: musics
    })

    res.status(201).json({
      success: true,
      message:"Album created succesfully",
      album:{
        id: album._id,
        title: album.title,
        artist: album.artist,
        musics: album.musics
      }
    })

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message:"Internal Server Error",
      error:"error.message"
    })
  }
}


/**
 * @description GetAllMusic --> takes in parameter[none]
 * @route GET /api/music/getAllMusic
 * @access public
 */
async function getAllMusic(req, res){
  try{

    const musics = await musicModel.find().populate("artist"). skip(0).limit(10);

    res.status(200).json({
      message:"Musics fetched Succesfully",
      musics: musics
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

/**
 * @description GetAllAlbums --> takes in parameter[none]
 * @route GET /api/music/getAllAlbums
 * @access public
 */
async function getAllAlbums(req, res){
  try{
    const albums = await albumModel.find().populate("artist").populate("musics").skip(0).limit(10);

    res.status(200).json({
      message:"Albums fetched Succesfully",
      albums: albums
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

/**
 * @description Get album by Id --> takes in parameter [id]
 * @route /api/music/albums/:albumId
 * @access private
 */
async function getAlbumById(req, res){
  try{

    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics");

    res.status(200).json({
      success: true,
      message:"Album fetched Succesfully",
      album: album
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




module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbums, getAlbumById };