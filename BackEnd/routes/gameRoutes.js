import express from "express";
import {
  createGame,
  getFeedGames,
  getUserGames,
  addOrRemovePlayer,
  updateGameComments,
  deleteGame,
} from "../controllers/gameController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//@desc    Create a game
router.post("/create", verifyToken, createGame);

//@desc    Get all games
router.get("/", verifyToken, getFeedGames);

//@desc    Get a user's games
router.get("/:userId/games", verifyToken, getUserGames);

//@desc     Add or remove a player from a game
router.patch("/:gameId/players", verifyToken, addOrRemovePlayer);

//@desc     Add a game comment
router.put("/update/:gameId/comments", verifyToken, updateGameComments);

//@desc    Delete a game
router.delete("/delete/:gameId", verifyToken, deleteGame);

export default router;
