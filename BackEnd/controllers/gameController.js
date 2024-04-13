import Game from "../models/game.js";
import { errorHandler } from "../utils/error.js"

//@desc     Create a post
//@route    POST /posts/create
export const createGame = async (req, res, next) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      title,
      locationName,
      locationLat,
      locationLng,
      description,
      userImage,
    } = req.body;

    const gameImage = req.file.filename;

    const newGame = new Game({
      userId,
      userImage,
      firstName,
      lastName,
      title,
      locationName,
      locationLat,
      locationLng,
      description,
      gameImage: req.file.filename,
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


//@desc     Get a game
//@route    GET /games/:gameId
export const getOneGame = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId);
    res.status(200).json(game);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
}


//@desc     Update a game comments
//@route    PATCH/games/update/:gameId/comments
export const updateGameComments = async (req, res, next) => {
  try {
    const { gameId } = req.params;

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


//@desc     Delete a game
//@route    DELETE /games/delete/:gameId
export const deleteGame = async (req, res, next) => {
    try {

      await Game.findByIdAndDelete(req.params.gameId);
      const games = await Game.find();
      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  };

//@desc     Delete a user's games
//@route    DELETE /games/delete/:userId/games
export const deleteUserGame = async (req, res, next) => {
  try {
    await Game.deleteMany({ userId: req.params.userId });
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};