import express from "express";
import { createGame, getFeedGames, getUserGames, likeGame } from "../controllers/gameController.js";
import { verifyToken } from "../utils/verifyToken.js";


const router = express.Router();

//@desc    Create a game
router.post('/create', createGame);

//@desc    Get all games
router.get("/", getFeedGames);

//@desc    Get a user's games
router.get("/:userId/games", getUserGames);

//@desc     Like a game
router.patch("/:id/like", likeGame);


export default router;