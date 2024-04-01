import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, min: 3, max: 50},
    lastName: { type: String, min: 3, max: 50},
    height: { type: Number},
    weight: { type: Number},
    email: { type: String,  max: 50, required: true, unique: true },
    password: { type: String, min: 8, required: true },
    userImage: { type: String, default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'},
    friends: { type: Array, default: [] },
    userBio: { type: String },
    location: { type: String },
    position: { type: String },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", UserSchema);
export default User;