import express from "express";
import { updateUser, deleteUser, logoutUser, getUserFriends, addRemoveFriend } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// @desc    Update a user
router.put("/update/:userId", verifyToken, updateUser);

// @desc    Delete a user
router.delete('/delete/:userId', verifyToken, deleteUser);

// @desc    Logout a user
router.post('/logout', logoutUser);

// @desc    Get a user's friends
router.get("/:id/friends", getUserFriends);

// @desc    Add or remove a friend
router.patch('/:id/:friendId', addRemoveFriend);

export default router;
