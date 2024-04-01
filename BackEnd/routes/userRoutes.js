import express from "express";
import {
  loginUser,
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authorisation.js";

const router = express.Router();

//@desc Login user
router.post("/login", loginUser);

//@desc Get user profile
router.get("/:id", verifyToken, getUser);

//@desc Get user friends
router.get("/:id/friends", verifyToken, getUserFriends);

//@desc Add or remove friend
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;