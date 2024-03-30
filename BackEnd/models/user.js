import { Schema as _Schema, model } from 'mongoose'


const Schema = _Schema
const userSchema = new Schema(
  {
    firstName: { type: String, min: 3, max: 50},
    lastName: { type: String, min: 3, max: 50},
    userName: { type: String, min: 3, max: 50, unique: true },
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
)

export default model('user', userSchema)