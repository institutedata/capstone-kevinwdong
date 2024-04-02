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

    // const salt = await bcrypt.genSalt();
    // const passwordHash = await bcrypt.hash(password, salt);
    const hasdedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hasdedPassword,
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
      return next(errorHandler(401, "Email not found"));
    }
    const isMatch = bcryptjs.compareSync(password, user.password);


    if (!isMatch) return next(errorHandler(401, "Invalid password"));
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password

    res
      .status(200)
      .json({token, user});
  } catch (error) {
    next(error);
  }
};
