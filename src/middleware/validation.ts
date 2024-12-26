import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CreateUserDto, CreatePostDto, UpdatePostDto } from "../dtos";

export class ValidationMiddleware {
  static async validateCreateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userDto = new CreateUserDto();
    Object.assign(userDto, req.body);

    const errors = await validate(userDto);
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.map((error) => Object.values(error.constraints!)),
      });
    }
    return next();
  }

  static async validateCreatePost(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const postDto = new CreatePostDto();
    Object.assign(postDto, req.body);

    const errors = await validate(postDto);
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.map((error) => Object.values(error.constraints!)),
      });
    }
    return next();
  }

  static async validateUpdatePost(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const postDto = new UpdatePostDto();
    Object.assign(postDto, req.body);

    const errors = await validate(postDto);
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.map((error) => Object.values(error.constraints!)),
      });
    }
    return next();
  }
}
