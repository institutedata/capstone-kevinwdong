import express from "express";
import { updateUser, deleteUser, logoutUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);


router.delete('/delete/:userId', verifyToken, deleteUser);

router.post('/logout', logoutUser);

export default router;
