import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

//@desc     Register a new user
//@route    POST /users/register
export const registerUser = async (req, res) => {
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
      userBio,
    } = req.body;

    const exsitUser = await User.findOne({ email });

    if (exsitUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      userImage,
      friends,
      location,
      position,
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
      userBio: savedUser.userBio,
      token: generateToken(savedUser._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//@desc     Authenticate a user by email and password
//@route    POST /users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userImage: user.userImage,
        friends: user.friends,
        location: user.location,
        position: user.position,
        userBio: user.userBio,
        token: generateToken(user._id),
      });
    } else {
      res.status(401)
      throw new Error("Invalid Email or Password");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//@desc     Get user profile
//@route    GET /users/:id
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//@desc     Get user friends
//@route    GET /users/:id/friends
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

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
    res.status(404).json({ message: err.message });
  }
};

//@desc     Add or remove user friends
//@route    PATCH /users/:id/:friendId
export const addRemoveFriend = async (req, res) => {
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
    res.status(404).json({ message: err.message });
  }
};
