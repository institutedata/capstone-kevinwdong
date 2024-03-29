import bcrypt from 'bcryptjs'
import { Schema as _Schema, model } from 'mongoose'


const Schema = _Schema
const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userImage: { type: String, default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'},
    userBio: { type: String },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default model('user', userSchema)
