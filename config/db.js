import mongoose from "mongoose";
import dotenv from "dotenv"
import colors from "colors"
dotenv.config()

const connection = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`connection successfull with mongodb atlas ${connect.connection.host}`.bold.green)
        
    } catch (error) {
        console.log(`Mondodb connection failed! ${error} `.bold.red)
        process.exit(1)
        
    }
}

export default connection