import express from "express";
import { updateUser, deleteUser, getUser } from "../controllers/userController.js";


const router = express.Router();

// @desc    Get a user
router.get("/:id", getUser);

// @desc    Delete a user
router.delete('/delete/:userId', deleteUser);


export default router;
