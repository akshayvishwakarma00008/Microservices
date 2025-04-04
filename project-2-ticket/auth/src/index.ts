import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { json } from "body-parser";
// import { json } from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", (req, res) => {
  throw new NotFoundError();
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

const start = async () => {
  if (!process.env.JWT_KEY){
    throw new Error("JWT_KEY  must be defines")
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("listining on port 3000");
  });
};

start();
