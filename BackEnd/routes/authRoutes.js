import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

//@desc Register user
router.post("/register", registerUser);

//@desc Login user
router.post("/login", loginUser);

export default router;