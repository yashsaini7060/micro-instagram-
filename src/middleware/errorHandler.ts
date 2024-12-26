import { Request, Response, NextFunction } from "express";
import { ValidationError } from "class-validator";
import { NotFoundError } from "../utils/errors";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);

  if (error instanceof NotFoundError) {
    return res.status(404).json({ message: error.message });
  }

  if (error instanceof ValidationError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};
