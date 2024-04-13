import express from "express";
import colors from 'colors'
import multer from "multer";
import path from "path";
import cors from "cors";
import { dbConnect } from './dbConnect.js'
import { verifyToken } from "./utils/verifyToken.js";
import { createGame } from "./controllers/gameController.js";
import { createPost } from "./controllers/postController.js";
import { updateUser } from "./controllers/userController.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.patch("/users/update/:userId", verifyToken, upload.single('file'), updateUser);
app.post("/games/create", verifyToken, upload.single('file'), createGame);
app.post("/posts/create", verifyToken, upload.single('file'), createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/games", gameRoutes);


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
 try {
  console.log(`Server is running on port ${PORT}. `.bgYellow)
 } catch (error) {
  console.log(`Server cannot Connect. `.bgRed)
  process.exit()
 }
})


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
