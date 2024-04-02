import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";


//@desc     Update a user
//@route    PUT /users/update/:userId
export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "Not allow to update this user"));
    }
    if (req.body.password) {
      if (req.body.password.length < 8) {
        return next(
          errorHandler(400, "Password must be at least 8 characters")
        );
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const token = req.header("Authorisation");

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
    delete user.password;
    res.status(200).json({token, user});
  } catch (error) {
    next(error);
  }
};



//@desc     Delete a user
//@route    DELETE /users/delete/:userId
export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "Not allow to delete this user"));
    }
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};


//@desc     Logout a user
//@route    POST /users/logout
export const logoutUser = async (req, res, next) => {
  try {
    res
      // .clearCookie("access_token")
      .status(200)
      .json("User has been logged out");
  } catch (error) {
    next(error);
  }
};


//@desc     Add or remove a friend
//@route    PATCH /users/:id/:friendId
export const addRemoveFriend = async (req, res, next) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, position, location, userImage }) => {
        return { _id, firstName, lastName, position, location, userImage };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    next(error);
  }
};
