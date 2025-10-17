const mongoose = require('mongoose')
async function connectTodb() {
    try{
        await mongoose.connect(process.env.Mongo_Url)
        console.log("connect to database")
    }
    catch(err){
        console.log("error in connecting to database")
    }
}
module.exports = connectTodb