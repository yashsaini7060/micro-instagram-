import { AppDataSource } from "../data-source";
import { Post } from "../models/Post";
import { CreatePostDto, UpdatePostDto } from "../dtos";
import { UserService } from "./UserService";
import { NotFoundError } from "../utils/errors";

export class PostService {
  private postRepository = AppDataSource.getRepository(Post);
  private userService = new UserService();

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ["user"],
    });
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    return post;
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { userId },
      relations: ["user"],
    });
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    await this.userService.getUserById(createPostDto.userId);

    const post = this.postRepository.create(createPostDto);
    const savedPost = await this.postRepository.save(post);

    await this.userService.updatePostCount(createPostDto.userId, true);
    return savedPost;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.getPostById(id);
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.getPostById(id);
    await this.userService.updatePostCount(post.userId, false);
    await this.postRepository.remove(post);
  }
}
