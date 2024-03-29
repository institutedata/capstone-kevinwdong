import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { User } from "../models/index.js";

//@desc     Authenticate a user by email and password
//@route    POST /aip/users/login
const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
      userImage: user.userImage,
      userBio: user.userBio,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});



//@desc     Register a user by email and password
//@route    POST /aip/users/register
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, userName, email, password, userImage, userBio } = req.body;

    const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    userName,
    email,
    password,
    userImage,
    userBio,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
      userImage: user.userImage,
      userBio: user.userBio,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@desc     Update a user profile by Id
//@route    GET /aip/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});



//@desc     Get a user by userName or email, and all users by no query
//@route    GET /aip/user/getUser
// const getUser = async (req, res) => {
//   try {
    // let query = {};
    // if (req.query.userName) {
    //   query = { userName: req.query.userName };
    //   const searchedUser = await User.findOne(query);
    //   if (!searchedUser) {
    //     res
    //       .status(400)
    //       .send({
    //         message: "User is not in the database. Username or emailId may be incorrect!",
    //       });
    //     console.log(
    //       "User is not in the database or username is incorrect!".yellow
    //     );
    //   } else {
    //     res.status(200).send({
    //       message: "User found by userName successfully!",
    //       data: searchedUser,
    //     });
    //     console.log("User found  successfully!".bgMagenta);
    //     return searchedUser;
    //   }
    // } else if (req.query.emailId) {
    //   query = { emailId: req.query.emailId };
    //   const searchedUser = await User.findOne(query);
    //   if (!searchedUser) {
    //     res
    //       .status(400)
    //       .send({
    //         message: "User is not in the database. Username or emailId may be incorrect!",
    //       });
    //     console.log(
    //       "User is not in the database or username is incorrect!".yellow
    //     );
    //   } else {
    //     res.status(200).send({
    //       message: "User found by emailId successfully!",
    //       data: searchedUser,
    //     });
    //     console.log("User found  successfully!".bgMagenta);
    //     return searchedUser;
    //   }
    // } else {
    // query = {};
//     const searchedUser = await User.find({});
//     console.log("User found  successfully!".bgMagenta);
//     res.status(200).send({ data: searchedUser });
//     return searchedUser;
//     }
//   } catch (error) {
//     console.error("User found  unsuccessfully:".bgRed, error.message);
//   }
// };

//@desc     Create a user and save in database.
//@route    POST /aip/user/create
// const createUser = async (req, res) => {
//   try {
    // const searchedByUserName = await User.findOne({userName: req.body.userName});
    // const searchedByemailId = await User.findOne({emailId: req.body.emailId});
    // if (searchedByUserName || searchedByemailId) {
    //   res.status(400).send({message: "UserName or emaidId has been used! Please choose a different one."})
    // } else {
//     const newUser = await new User(req.body).save();
//     res.status(200).send({ data: newUser });
//     console.log("New user created successful!".bgMagenta);
//     }
//   } catch (error) {
//     console.error("User created unsuccessful:".bgRed, error.message);
//     throw error;
//   }
// };

//@desc     Update a user detailes
//@route    PUT /aip/user/update
// const updateUser = async (req, res) => {
//   try {
//     const searchedUser = await User.findOne({ userName: req.query.userName });
//     if (!searchedUser) {
//       res.status(400).send({
//         message: "User is not in the database or username is incorrect!",
//       });
//     } else {
//       const user_id = searchedUser._id;
//       console.log(user_id);
//       const updatedUser = await User.findByIdAndUpdate(user_id, req.body, {
//         new: true,
//       });
//       res.status(200).send({
//         message: "User updated successfully!",
//         data: updatedUser,
//       });
//       console.log("User updated successfully!".bgMagenta);
//     }
//   } catch (error) {
//     console.error("User updated unsuccessfully:".bgRed, error.message);
//     throw error;
//   }
// };

//@desc     Delete a user
//@route    DELETE /aip/user/update
// const deleteUser = async (req, res) => {
//   try {
//     let query = {};

//     if (req.query.userName) query = { userName: req.query.userName };

//     if (req.query.emailId) query = { emailId: req.query.emailId };

//     const searchedUser = await User.findOne(query);

//     if (!searchedUser) {
//       res.status(400).send({
//         message:
//           "User is not in the database. Username or emailId may be incorrect!",
//       });
//       console.log(
//         "User is not in the database or username is incorrect!".yellow
//       );
//     } else {
//       const user_id = searchedUser._id;
//       console.log(user_id);
//       const updatedUser = await User.findByIdAndDelete(user_id);
//       res.status(200).send({
//         message: "User deleted successfully",
//         data: updatedUser,
//       });
//       console.log("User deleted successfully".bgMagenta);
//     }
//   } catch (error) {
//     console.error("User deleted unsuccessfully:".bgRed, error.message);
//     throw error;
//   }
// };

export default {
  authenticateUser,
  registerUser,
  updateUserProfile,

  // getUser,
  // createUser,
  // updateUser,
  // deleteUser,
};
