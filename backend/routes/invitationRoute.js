import express from "express";
import { sendInvitation, acceptInvitation, declineInvitation } from "../controller/invitationController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/:receiverId/send", protectRoute, sendInvitation);
router.post("/accept", protectRoute, acceptInvitation);
router.post("/decline", protectRoute, declineInvitation);

export default router;
