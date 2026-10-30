const { ImageKit } = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});


async function uploadFile(file){
  try{

    const result = await ImageKitClient.files.upload({
      file,
      fileName:"music_" + Date.now(),
      folder:"complete-backend/music"
    })

    return result;

  }
  catch(error){
    console.error("Error uploading file:", error);
    throw error;
  }
}

module.exports = { uploadFile };