import express from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
  getUserProfile,
  authCheck,
  updateProfile,
} from "../controller/userController.js";
import protectRoute from "../middleware/protectRoute.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post(
  "/update",
  protectRoute,
  upload.single("profilePic"),
  updateProfile
);
router.get("/profile", getUserProfile);
router.get("/authcheck", protectRoute, authCheck);

export default router;
