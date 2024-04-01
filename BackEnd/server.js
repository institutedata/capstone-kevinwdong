import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv'
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
// import { userController } from './controllers/index.js';
import { registerUser }from './controllers/userController.js';
import { createPost } from './controllers/postController.js';
import { verifyToken } from './middleware/authorisation.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

//@desc     This is only for injecting dummy data to the database!
// import User from './models/user.js';
// import Post from './models/post.js';
// import { users, posts } from './data/index.js';


//@desc     Sever Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenvConfig();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'public/images')));

//@desc     Setup file upload functionality
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//@desc     Routes with file upload functionality
app.post('/users/register', upload.single('picture'), registerUser);
app.post('/posts', verifyToken, upload.single('picture'),createPost);

//@desc     Routes without file upload functionality
// app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

//@desc     Setup mongodb database

const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('MongoDB is connected!')
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))

    //@desc     For inject dummy data to the database, only use once and comment out to prevent duplication

    // User.inserMany(User);
    // Post.insertMany(posts);

})
  .catch((error) => console.log(`${error} did not connect`));