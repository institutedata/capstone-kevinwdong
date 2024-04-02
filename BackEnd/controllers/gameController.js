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
      location,
      description,
      gameImage,
      userImage,
      participancts,
      comments,
    } = req.body;

    const user = await User.findById(userId);

    const newGame = new Game({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      location,
      description,
      userImage: user.userImage,
      gameImage,
      paticipants: {},
      comments: [],
    });
    await newGame.save();

    const games = await Game.find();
    res.status(201).json(games);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//@desc     Get all posts
//route    GET /posts
export const getFeedGames = async (req, res, next) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//@desc     Get a user's posts
//@route    GET /posts/:userId/posts
export const getUserGames = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//@desc     Like a post
//@route    PATCH /posts/:id/like
export const likeGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};
