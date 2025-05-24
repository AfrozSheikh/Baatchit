import express from "express" 
import { protectRoute } from "../middleware/auth.middleware.js";
import {getMyFriend,sendFriendRequest, getRecommendUsers,acceptFriendRequest,getOutgoingFriendReqs , getFriendRequests } from "../controllers/user.controller.js";


const router = express.Router();
router.use(protectRoute)
router.get("/" , getRecommendUsers)

router.get("/friends" , getMyFriend)


router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;

