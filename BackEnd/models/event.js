
import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
const eventSchema = new Schema({
  title: { type: String, trim: true, required: true },
  time: { type: Date, trim: true, required: true },
  location: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  numberOfParticipants: { type: Number, trim: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  stars: [
    { user_id: { type: Schema.Types.ObjectId, ref: "User", required: true } },
  ],
  participants: [
    {
      user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      commentText: { type: String, trim: true, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default model("Event", eventSchema);
