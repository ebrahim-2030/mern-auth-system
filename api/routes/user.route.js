import express from "express";
import { signup, signin, googleAuth, signout } from "../controllers/auth.controller.js";

const router = express.Router();

// signup route to handle user registration
router.post("/signup", signup);

// signin route to handle user login
router.post("/signin", signin);

// google route to handle user registration or login via google
router.post("/google", googleAuth);

// signout route to handle user logout
router.post("/signout", signout);


export default router;
