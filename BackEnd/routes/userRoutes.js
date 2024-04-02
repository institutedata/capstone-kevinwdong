import express from "express";
import { updateUser, deleteUser, logoutUser, addRemoveFriend } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// @desc    Update a user
router.put("/update/:userId", verifyToken, updateUser);

// @desc    Delete a user
router.delete('/delete/:userId', verifyToken, deleteUser);

// @desc    Logout a user
router.post('/logout', logoutUser);


router.patch('/:id/:friendId',verifyToken, addRemoveFriend);

export default router;
