import express from "express";
import { userController } from "../controllers/index.js";
import { verifyToken } from "../middleware/authorisation.js";

const router = express.Router();

//@desc Login user
router.post("/login", (req, res) => {
  userController.loginUser(req, res);
});

//@desc Get user profile
router.get("/:id", verifyToken, (req, res) => {
  userController.getUser(req, res);
});

//@desc Get user friends
router.get("/:id/friends", verifyToken, (req, res) => {
  userController.getUserFriends(req, res);
});

//@desc Add or remove friend
router.patch("/:id/:friendId", verifyToken, (req, res) => {
  userController.addRemoveFriend(req, res);
});

export default router;
