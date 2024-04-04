import express from "express";
import cors from "cors";
// import { config as dotenvConfig } from "dotenv";
import { dbConnect } from './dbConnect.js'
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
// import cookieParser from "cookie-parser";
import colors from 'colors'


// dotenvConfig();

const app = express();
app.use(express.json());
// app.use(cookieParser());
app.use(cors());


app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/games", gameRoutes);


// const PORT = process.env.PORT || 8080;
// mongoose
//   .connect(process.env.MONGODB)
//   .then(() => {
//     console.log("MongoDB is connected!");
//     app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

//   })
//   .catch((error) => console.log(`${error} did not connect`));

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
