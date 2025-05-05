import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { json } from "body-parser";
// import { json } from "express";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@microservices-projects/common";
import { createTicketRouter } from "./routes/new";

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.use(currentUser);
app.use(createTicketRouter);

app.all("*", (req, res) => {
    throw new NotFoundError();
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

export { app };