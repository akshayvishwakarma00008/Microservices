import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

// Error handler should be typed as a 4-parameter function
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }


  // Fallback for any other errors
  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
