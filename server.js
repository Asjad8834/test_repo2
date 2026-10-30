require("dotenv").config();

const app = require("./src/app");
const connectDb = require("./src/db/db");

const PORT = process.env.PORT;

const startServer = async () => {
  try{
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server started on Port: ${PORT}`);
    })
  }
  catch(error){
    console.error("Server start error");
  }
}

startServer();




