import mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const uri = process.env.DB_URI || "mongodb://localhost/hoopsconnect";

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Error:" + error.message));

export const dbConnect = mongoose.connection;

dbConnect.on("error", console.error.bind(console, "MongoDBconnection error:"));
