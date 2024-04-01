import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/postController.js";
import { verifyToken } from "../middleware/authorisation.js";

const router = express.Router();

//@desc     Get all posts in the database
router.get("/", verifyToken, getFeedPosts);

//@desc     Get only verified user's posts
router.get("/:userId/posts", verifyToken, getUserPosts);

//@desc     Like or unlike a post
router.patch("/:id/like", verifyToken, likePost);

export default router;