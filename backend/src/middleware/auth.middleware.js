import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protectRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt ; 
        if(!token) return res.status(401).json({msg:"unauthorized - no token there "})
            const decoded = jwt.verify(token,process.env.jwt_secret);
        if(!decoded) return res.status(401).json({msg:"not the valid token "})
                // console.log(decoded);
                
            const user = await User.findById(decoded.userId).select("-password")
            if(!user) return res.status(401).json({msg:"user does not exist "}) 
                req.user = user;
            next() ; 
    } catch (error) {
        console.log("error in protect route");
        console.log(error);
        return res.status(500).json({msg:"server error "})
        
        
    }
}