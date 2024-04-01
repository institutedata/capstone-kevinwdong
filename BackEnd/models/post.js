import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: { type: String },
    postTitle: { type: String },
    postDescription: { type: String },
    postImage: { type: String },
    userImage: { type: String },
    likes: { type: Map, of: Boolean },
    comments: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
