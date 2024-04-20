import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  updatePostComments,
  deletePost,
  deleteUserPost,
} from "../controllers/postController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();


//@desc    Get all posts
router.get("/", verifyToken, getFeedPosts);

//@desc    Get a user's posts
router.get("/:userId/posts", verifyToken, getUserPosts);

// @desc    Update a post
router.patch("/update/:postId/comments", verifyToken, updatePostComments);

//@desc     Like a post
router.patch("/:postId/like", verifyToken, likePost);

//@desc     Delete a post
router.delete("/delete/:postId", verifyToken, deletePost);

//@desc    Delete a user's posts
router.delete("/delete/:userId/posts", verifyToken, deleteUserPost);

export default router;
