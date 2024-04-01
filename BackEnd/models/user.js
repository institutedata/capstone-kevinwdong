import { Schema as _Schema, model } from 'mongoose'
import bcrypt from "bcrypt";


const Schema = _Schema
const userSchema = new Schema(
  {
    firstName: { type: String, min: 3, max: 50, required: true},
    lastName: { type: String, min: 3, max: 50, required: true},
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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


export default model('user', userSchema)