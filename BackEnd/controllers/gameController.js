import Game from "../models/game.js";
import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";

//@desc     Create a post
//@route    POST /posts/create
export const createGame = async (req, res, next) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      title,
      location,
      description,
      gameImage,
      userImage,
      players,
      comments,
    } = req.body;

    const user = await User.findById(userId);

    const newGame = new Game({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      title,
      location,
      description,
      userImage: user.userImage,
      gameImage,
      players: [],
      comments: [],
    });
    await newGame.save();

    const games = await Game.find();
    res.status(201).json(games);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//@desc     Get all games
//route    GET /games
export const getFeedGames = async (req, res, next) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//@desc     Get a user's games
//@route    GET /games/:userId/games
export const getUserGames = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const game = await Game.find({ userId });
    res.status(200).json(game);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//@desc     Play a game
//@route    PATCH /games/:id/play
export const addOrRemovePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const game = await Game.findById(id);
    const isPlay = game.players.filter((player) => player.userId === userId)[0];

    if (!isPlay) {
      const updatedGame = await Game.findByIdAndUpdate(
        id,
        {
          $push: { players: req.body },
        },
        { new: true }
      );
      res.status(200).json(updatedGame);
    } else {
      const updatedGame = await Game.findByIdAndUpdate(
        id,
        { $pull: { players: { _id: isPlay._id } } },
        { new: true }
      );
      res.status(200).json(updatedGame);
    }
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//@desc     Update a game comments
//@route    PATCH/games/update/:gameId/comments
export const updateGameComments = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const { comments } = req.body;

    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      { $push: { comments: req.body } },
      { new: true }
    );

    res.status(200).json(updatedGame);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};
