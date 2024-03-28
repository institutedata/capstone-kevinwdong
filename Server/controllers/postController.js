
import { Post } from "../models/index.js";
import { postQuery } from "../utility/index.js";

//@desc     Get post by diffent selected queries, return one or more post.
//@route    GET /aip/post/get
const getPost = async (req, res) => {
  try {
    const query = await postQuery.getPostQuery(req, res);

    const searchedPosts = await Post.find(query);

    if (searchedPosts.length === 0) {
      res.status(400).send({ query: query, message: "No search result found." });
      return;
    } else {
      res.status(200).send({ 
        message: "Posts found by id successfully!",
        query: query, 
        data: searchedPosts });
      console.log("Posts found by id successfully!".bgGreen);
      return searchedPosts;
    }
  } catch (error) {
    console.error("Posts found unsuccessfully:".bgRed, error.message);
    throw error;
  }
};

//@desc     Create a post and save in database.
//@route    POST /aip/post/create
const createPost = async (req, res) => {
  try {
    const data = req.body.typeOfSport;
    const alllowerCase = data.toLowerCase();
    const firstLetterUpperCase =
      alllowerCase.charAt(0).toUpperCase() + alllowerCase.slice(1);

    const newPost = {
      postTitle: req.body.postTitle,
      typeOfSport: firstLetterUpperCase,
      postText: req.body.postText,
      user_id: req.body.user_id,
      event_id: req.body.event_id,
    };

    const savedNewPost = await new Post(newPost).save();
    res.status(200).send({ data: newPost });
    console.log("New post created successful!".bgGreen);
  } catch (error) {
    console.error("post created unsuccessful:".bgRed, error.message);
    throw error;
  }
};

//@desc     Update a post detailes depend on different query
//@route    PUT /aip/post/update
const updatePost = async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.query.post_id,
      req.body,
      { new: true }
    );
    if (!updatePost) {
      res.status(400).send({message: "Post id is incorrect!"})
    } else {
    res
      .status(200)
      .send({ message: "Post updated successfully", data: updatePost });
    console.log("Post updated successfully".bgGreen);
    }
  } catch (error) {
    console.error("Post updated unsuccessfully:".bgRed, error);
    throw error;
  }
};

//@desc     Update a post comment
//@route    PUT /post/updateCommnet
const updatePostComment = async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.query.post_id,
      { $push: { comments: req.body.comments } },
      { new: true }
    );
    res.status(200).send({
      message: "Post comment updated successfully",
      numberOfComments: updatePost.comments.length,
      data: updatePost,
    });
    console.log("Post comment updated successfully".bgGreen);
  } catch (error) {
    console.error("Post comment updated unsuccessfully:".bgRed, error);
    throw error;
  }
};

//@desc     Update a post star
//@route    PUT /post/updateStar
const updatePostStar = async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.query.post_id,
      { $push: { stars: req.body.stars } },
      { new: true }
    );
    res.status(200).send({
      message: "Post star updated successfully",
      numberOfStars: updatePost.stars.length,
      data: updatePost });
    console.log("Post star updated successfully".bgGreen);
    console.log("Post updated successfully".bgGreen);
  } catch (error) {
    console.error("Post updated unsuccessfully:".bgRed, error);
    throw error;
  }
};

//@desc     Delete one or more posts based on query conditions
//@route    DELETE /aip/post/delete
const deletePost = async (req, res) => {
  try {
    if (!req.query.user_id) {
      res.status(400).send({ message: "User id must be seleted!" });
      console.log("User id must be seleted!".yellow);
      return;
    } else {
      const query = await postQuery.deletePostQuery(req, res);

      console.log(query);

      const deletedPosts = await Post.deleteMany(query);
      if (deletedPosts.deletedCount === 0) {
        res.status(400).send({ message: "No search result found." });

        return;
      } else {
        res.status(200).send({
          query: query,
          message: "Posts deleted successfully",
          data: deletedPosts,
        });
        console.log("Posts deleted successfully".bgGreen);
        return;
      }
    }
  } catch (error) {
    console.error("Events delete unsuccessfully:".bgRed, error.message);
    throw error;
  }
};


export default {
  getPost,
  createPost,
  updatePost,
  updatePostComment,
  updatePostStar,
  deletePost,
};
