import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  updatePostComments,
  deletePost,
} from "../controllers/postController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();


//@desc    Get all posts
router.get("/", verifyToken, getFeedPosts);

//@desc    Get a user's posts
router.get("/:userId/posts", verifyToken, getUserPosts);

// @desc    Update a post
router.put("/update/:postId/comments", verifyToken, updatePostComments);

//@desc     Like a post
router.patch("/:postId/like", verifyToken, likePost);

//@desc     Delete a post
router.delete("/delete/:postId", verifyToken, deletePost);

export default router;
