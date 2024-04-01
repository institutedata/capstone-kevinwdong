import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

//@desc     Register a new user
//@route    POST /users/register
export const registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      userImage,
      friends,
      location,
      position,
      height,
      weight,
      userBio,
    } = req.body;

    const exsitUser = await User.findOne({ email });

    if (exsitUser) {
      next(errorHandler(400, "User already exists"));
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      userImage,
      friends,
      location,
      position,
      height,
      weight,
      userBio,
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      _id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      userImage: savedUser.userImage,
      friends: savedUser.friends,
      location: savedUser.location,
      position: savedUser.position,
      height: savedUser.height,
      weight: savedUser.weight,
      userBio: savedUser.userBio,
      token: generateToken(savedUser._id),
    });
  } catch (error) {
    next(error);
  }
};

//@desc     Authenticate a user by email and password
//@route    POST /users/login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword || !user) {
     return next(errorHandler(401, "Invalid email or password"));
    }

    const token = generateToken(user._id);
    delete user.password;
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};
