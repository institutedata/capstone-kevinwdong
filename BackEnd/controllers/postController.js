import Post from "../models/Post.js";
import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";

//@desc     Create a post
//@route    POST /posts/create
export const createPost = async (req, res) => {
  try {
    const { userId, description, postImage } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userImage: user.userImage,
      postImage,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};



//@desc     Get all posts
//route    GET /posts
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};


//@desc     Get a user's posts
//@route    GET /posts/:userId/posts
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    next(errorHandler(400, error.message));
  }
};



