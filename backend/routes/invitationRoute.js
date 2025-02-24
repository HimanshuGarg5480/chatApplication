import express from "express";
import { sendInvitation, acceptInvitation, declineInvitation, getInvitation } from "../controller/invitationController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
router.get("/", protectRoute, getInvitation);
router.post("/:receiverId/send", protectRoute, sendInvitation);
router.post("/accept", protectRoute, acceptInvitation);
router.post("/decline", protectRoute, declineInvitation);

export default router;
