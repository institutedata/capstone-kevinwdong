import express from "express";
import { postController } from "../controllers/index.js";
import { verifyToken } from "../middleware/authorisation.js";

const router = express.Router();

//@desc     Get all posts in the database
router.get("/", verifyToken, (req, res) => {
  postController.getFeedPosts(req, res);
});

//@desc     Get only verified user's posts
router.get("/:userId/posts", verifyToken, (req, res) => {
  postController.getUserPosts(req, res);
});

//@desc     Like or unlike a post
router.patch("/:id/like", verifyToken, (req, res) => {
  postController.likePost(req, res);
});

export default router;