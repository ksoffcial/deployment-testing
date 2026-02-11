require('dotenv').config()
const moongoose = require("mongoose")

const main = async()=>{
    await moongoose.connect(process.env.DB_CONNECT)
    console.log("DB connected sucessfully...");
}

module.exports = main