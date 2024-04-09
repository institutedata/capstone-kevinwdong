import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, min: 3, max: 50},
    lastName: { type: String, min: 3, max: 50},
    height: { type: Number},
    weight: { type: Number},
    email: { type: String,  max: 50, required: true, unique: true },
    password: { type: String, min: 8, required: true },
    userImage: { type: String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'},
    friends: { type: Array, default: [] },
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