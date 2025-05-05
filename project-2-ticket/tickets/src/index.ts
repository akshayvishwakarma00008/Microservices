import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY){
    throw new Error("MONGO_URI  must be defines")
  }
  if (!process.env.MONGO_URI){
    throw new Error("JWT_KEY  must be defines")
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("listining on port 3000!!");
  });
};

start();
