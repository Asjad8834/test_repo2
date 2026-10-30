const express = require("express");

const musicRouter = express.Router();

const musicController = require("../controllers/music.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const multer = require("multer");
// middleware used to handle file uploads 
// req.boody.file will not work

const upload = multer({
  storage: multer.memoryStorage(),
})

// We have to use multer.memoryStorage() because we are uploading the file to ImageKit and not storing it in our server. If we use multer.diskStorage() then the file will be stored in our server and then we have to upload it to ImageKit which is not efficient. So we are using multer.memoryStorage() which stores the file in memory and then we can upload it to ImageKit.

/**
 * @description Music Routes
 * @route /api/music/upload
 */
musicRouter.post("/upload", authMiddleware.authArtist, upload.single("music"), musicController.createMusic );

//upload.single("music")-> music is name of the field coloumn that should be given in postman while uploading the file


module.exports = musicRouter;