import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    title: { type: String, required: true },
    locationName: { type: String },
    locationLat: { type: Number },
    locationLng: { type: Number },
    description: { type: String },
    gameImage: { type: String },
    userImage: { type: String },
    comments: [
      {
        userId: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        comment: { type: String },
        userImage: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", gameSchema);
export default Game;
