import express from "express";
import { connectDB } from "./lib/db.js";
const app = express() 
import authRoutes from './routes/auth.routes.js'

app.use(express.json())
connectDB() ; 
app.use("/api/auth", authRoutes)

 
app.listen(5001, ()=>{
    console.log("hii");
    
})