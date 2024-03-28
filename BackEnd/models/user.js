
import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema
const userSchema = new Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    userName: { type: String, trim: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    userImage: { type: String, trim: true },
    bio: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
)
export default model('user', userSchema)
