import express from "express";
import { registerUser, loginUser, google} from "../controllers/authController.js";

const router = express.Router();

//@desc Register user
router.post("/register", registerUser);

//@desc Login user
router.post("/login", loginUser);


//@desc Continue with google
router.post("/google", google);
export default router;