import express from "express";
import {
  createGame,
  getFeedGames,
  getUserGames,
  addOrRemovePlayer,
  updateGameComments,
  deleteGame,
} from "../controllers/gameController.js";

const router = express.Router();

//@desc    Create a game
router.post("/create",  createGame);

//@desc    Get all games
router.get("/", getFeedGames);

//@desc    Get a user's games
router.get("/:userId/games", getUserGames);

//@desc     Add or remove a player from a game
router.patch("/:gameId/players", addOrRemovePlayer);

//@desc     Add a game comment
router.put("/update/:gameId/comments", updateGameComments);

//@desc    Delete a game
router.delete("/delete/:gameId", deleteGame);

export default router;
