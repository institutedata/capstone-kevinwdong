import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { config as dotenvConfig } from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { userController } from "./controllers/index.js";
import { postController } from "./controllers/index.js";
import { verifyToken } from "./middleware/authorisation.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

//@desc     This is only for injecting dummy data to the database!
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";


//@desc     Sever Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenvConfig();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/images")));

//@desc     Setup file upload functionality
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//@desc     Routes with file upload functionality
app.post("/users/register", upload.single("picture"), (req, res) => {
  userController.registerUser(req, res);
});
app.post("/posts", verifyToken, upload.single("picture"), (req, res) => {
  postController.createPost(req, res);
});

//@desc     Routes without file upload functionality
// app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//@desc     Setup mongodb database
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("MongoDB is connected!")

    //@desc     For inject dummy data to the database, only use once and comment out to prevent duplication

    // User.inserMany(users);
    // Post.insertMany(posts);

})
  .catch((error) => console.log(`${error} did not connect`));
