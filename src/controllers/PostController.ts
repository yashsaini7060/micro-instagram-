import { Request, Response } from "express";
import { PostService } from "../services/PostService";
import { asyncHandler } from "../utils/asyncHandler";
import { CreatePostDto, UpdatePostDto } from "../dtos";

export class PostController {
  private postService = new PostService();

  getAllPosts = asyncHandler(async (_req: Request, res: Response) => {
    const posts = await this.postService.getAllPosts();
    res.json(posts);
  });

  getUserPosts = asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const posts = await this.postService.getUserPosts(userId);
    res.json(posts);
  });

  createPost = asyncHandler(async (req: Request, res: Response) => {
    const postData: CreatePostDto = req.body;
    const post = await this.postService.createPost(postData);
    res.status(201).json(post);
  });

  updatePost = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const postData: UpdatePostDto = req.body;
    const post = await this.postService.updatePost(id, postData);
    res.json(post);
  });

  deletePost = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await this.postService.deletePost(id);
    res.status(204).send();
  });
}
