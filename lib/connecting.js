import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const URI = process.env.URI;
mongoose.connect(URI, () => {
  try {
    console.log("DB-connected");
  } catch (error) {
    console.log(error);
  }
});
