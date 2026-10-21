const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({

  title:{
    type: String,
    required: [true, "title is required"]
  },

  musics:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "music"
  }],

  artist:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
    required: [true, "artist is required"]
  }

})

const albumModel = mongoose.model("album", albumSchema);

module.exports = albumModel;