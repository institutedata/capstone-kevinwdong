import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    description: { type: String, required: true},
    postImage: { type: String },
    userImage: { type: String },
    likes: { type: Map, of: Boolean },
    comments: [{ 
      userId: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      comment: { type: String, required: true },
      userImage: { type: String, required: true },
    }],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
