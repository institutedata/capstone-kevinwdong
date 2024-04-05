import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


//@desc     Get a user
//@route    GET /users/:id
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//@desc     Update a user
//@route    PUT /users/update/:userId
export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      if (req.body.password.length < 8) {
        return next(
          errorHandler(400, "Password must be at least 8 characters")
        );
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }


    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          height: req.body.height,
          weight: req.body.weight,
          position: req.body.position,
          location: req.body.location,
          email: req.body.email,
          userImage: req.body.userImage,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

//@desc     Delete a user
//@route    DELETE /users/delete/:userId
export const deleteUser = async (req, res, next) => {
  try {

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};




