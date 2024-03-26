
import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const postSchema = new Schema(
  {
    postTitle: { type: String, trim: true, required: true },
    postText: { type: String, trim: true },
    postImage: { type: String, trim: true },
    stars: [{ user_id: { type: Schema.Types.ObjectId, ref: "User", required: true } },],
    comments: [{
      user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      commentText: { type: String, trim: true, required: true },
      createdAt: { type: Date, default: Date.now }
    }],
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }  
  },
  {
    timestamps: true,
  }
)
export default model('post', postSchema)
