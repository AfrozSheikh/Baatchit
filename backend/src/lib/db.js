import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()
console.log(process.env.MongoDB);

export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MongoDB)
        console.log("db connected");
        
    } catch (error) {
        console.log("error in connection with db ");
        console.log(error);
        
        process.exit(1);
        
        
    }
    
}