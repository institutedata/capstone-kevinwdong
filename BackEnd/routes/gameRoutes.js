import express from "express";
import {
  createGame,
  getFeedGames,
  getUserGames,
  addOrRemovePlayer,
  updateGameComments,
} from "../controllers/gameController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//@desc    Create a game
router.post("/create", createGame);

//@desc    Get all games
router.get("/", getFeedGames);

//@desc    Get a user's games
router.get("/:userId/games", getUserGames);

//@desc     Add or remove a player from a game
router.patch("/:id/player", addOrRemovePlayer);

//@desc     Add a game comment
router.put("/update/:gameId/comments", updateGameComments);

export default router;
