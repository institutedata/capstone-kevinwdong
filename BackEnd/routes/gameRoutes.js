import express from "express";
import {
  createGame,
  getFeedGames,
  getUserGames,
  getOneGame,
  updateGameComments,
  deleteGame,
  deleteUserGame,
} from "../controllers/gameController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//@desc    Get all games
router.get("/", verifyToken, getFeedGames);

//@desc    Get a user's games
router.get("/:userId/games", verifyToken, getUserGames);

//@desc    Get a game
router.get("/:gameId", verifyToken, getOneGame);

//@desc     Add a game comment
router.patch("/update/:gameId/comments", verifyToken, updateGameComments);

//@desc    Delete a game
router.delete("/delete/:gameId", verifyToken, deleteGame);

//@desc    Delete a user's games
router.delete("/delete/:userId/games", verifyToken, deleteUserGame);


export default router;
