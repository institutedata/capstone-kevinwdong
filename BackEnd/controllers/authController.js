import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

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

    const userImageUrl = await fetch(
      "https://source.unsplash.com/featured/?male"
    ).then((response) => response.url);

    console.log(userImageUrl);

    const hasdedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hasdedPassword,
      userImage: userImageUrl,
      friends,
      location,
      position,
      height,
      weight,
      userBio,
      totalGames: Math.floor(Math.random() * 100),
      totalPoints: Math.floor(Math.random() * 1000),
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

//@desc     Authenticate a user by email and password
//@route    POST /users/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
      next(errorHandler(400, "All fields are required"));
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return next(errorHandler(401, "Invalid Email or Password"));
    }
    const isMatch = bcryptjs.compareSync(password, user.password);

    if (!isMatch) return next(errorHandler(401, "Invalid Email or Password"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

//@desc     Continue with google
//@route    POST /auth/google
export const google = async (req, res, next) => {
  try {
    const { firstName, lastName, email, userImage } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      return res.status(200).json({ token, user });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hasdedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hasdedPassword,
        userImage,
        totalGames: Math.floor(Math.random() * 100),
        totalPoints: Math.floor(Math.random() * 1000),
      });
      const user = await newUser.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(201).json({ token, user });
    }
  } catch (error) {
    next(error);
  }
};
