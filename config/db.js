import mongoose from'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Database connected successfully")

    }catch(error){
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export {connectdb};