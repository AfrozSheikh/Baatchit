import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export async function signup (req,res){
   const { email , password , name } = req.body;

 try {
    if(!email|| !password||!name){
        return res.status(400).json({message: "Please fill in all fields."});
    }

    if(password.length<6){
        return res.status(400).json({message: "Password must be at least 6 characters."});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Invalid email format" });
}

const existingUser = await User.findOne({ email: email });
if (existingUser) {
    return res.status(400).json({ message: "Email already in use. Use different email . " });
}
const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
const user = await  User.create({email , name , password , profilePic : randomAvatar });
const token = jwt.sign({userId : user._id},process.env.jwt_secret,{ expiresIn : "7d"})

res.cookie("jwt" , token, {
    maxAge : 1000 * 60 * 60 * 24 * 7 , // 1 week
    httpOnly : true ,
    sameSite:"strict" , 
    secure : process.env.NODE_ENV==="production"
})

res.status(201).json({success : true , user : user , message :"user create successfully " })
 } catch (error) {
    console.log("error in signup ", error);
    res.status(500).json({message :"Internal error while sign up "})
    
 }
}
export async function login (req,res){
try {
    const {email , password } = req.body;
    if(!email || !password) {
        return res.status(400).json({message :"All field are required "})
    }
    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({message :"Invalid email or password "})
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.status(401).json({message :"Invalid password "})
    }

    const token = jwt.sign({userId : user._id},process.env.jwt_secret,{ expiresIn : "7d"})

res.cookie("jwt" , token, {
    maxAge : 1000 * 60 * 60 * 24 * 7 , // 1 week
    httpOnly : true ,
    sameSite:"strict" , 
    secure : process.env.NODE_ENV==="production"
})

    res.status(200).json({success :true ,user ,token ,  message:"user log in successfully "})

} catch (error) {
    console.log("error in login ", error);
    res.status(500).json({message :"Internal errorwhile login  "})
} 
}
export function logout (req,res){
   res.clearCookie("jwt")
   res.status(200).json({success :true  , message:" log out  successfully "})

}