import express from "express";
import { signup, signin, googleAuth, signout, getMe } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verfyToken.js";

const router = express.Router();

// signup route to handle user registration
router.post("/signup", signup);

// signin route to handle user login
router.post("/signin", signin);

// google route to handle user registration or login via google
router.post("/google", googleAuth);

// signout route to handle user logout
router.post("/signout", signout);

// auth check route to get current user data
router.get("/me",verifyToken, getMe);


export default router;
