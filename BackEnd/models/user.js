import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, min: 3, max: 50},
    lastName: { type: String, min: 3, max: 50},
    height: { type: Number},
    weight: { type: Number},
    email: { type: String,  max: 50, required: true, unique: true },
    password: { type: String, min: 8, required: true },
    userImage: { type: String, default: 'defaultAvatar.png'},
    location: { type: String },
    position: { type: String },
    totalGames: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", UserSchema);
export default User;