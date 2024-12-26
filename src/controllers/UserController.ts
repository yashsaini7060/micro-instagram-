// src/controllers/UserController.ts
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { asyncHandler } from "../utils/asyncHandler";
import { CreateUserDto } from "../dtos";

export class UserController {
  private userService = new UserService();

  getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.json(users);
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await this.userService.getUserById(id);
    res.json(user);
  });

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const userData: CreateUserDto = req.body;
    const user = await this.userService.createUser(userData);
    res.status(201).json(user);
  });
}
