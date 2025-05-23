import express from "express" 
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();
router.use(protectRoute)
router.get("/" , getRecommendUsers)

router.get("/friends" , getMyFriend)
router.post("/friend-request/:id" , sendFriendRequest)
