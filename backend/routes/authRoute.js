import express from "express";
import { loginUser, logoutUser, signupUser, getUserProfile, authCheck } from "../controller/userController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);
router.get('/authcheck', protectRoute ,authCheck);

export default router;
