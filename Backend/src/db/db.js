// const mongoose = require('mongoose')
// async function connectTodb() {
//     try{
//         await mongoose.connect(process.env.Mongo_Url)
//         console.log("connect to database")
//     }
//     catch(err){
//         console.log("error in connecting to database")
//     }
// }
// module.exports = connectTodb

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Database connected successfully");
  } catch (error) {
    console.error(" Error connecting to database:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
