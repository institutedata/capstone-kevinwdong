import express from "express";
import { updateUser, deleteUser, getUserFriends, addRemoveFriend, getUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// @desc    Get a user
router.get("/:id", getUser);

// @desc    Update a user
router.put("/update/:userId",  updateUser);

// @desc    Delete a user
router.delete('/delete/:userId', deleteUser);


// @desc    Get a user's friends
router.get("/:id/friends", getUserFriends);

// @desc    Add or remove a friend
router.patch('/:id/:friendId', addRemoveFriend);

export default router;
