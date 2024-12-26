import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { PostController } from "../controllers/PostController";
import { ValidationMiddleware } from "../middleware/validation";

const router = Router();
const userController = new UserController();
const postController = new PostController();

// User routes
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post(
  "/users",
  ValidationMiddleware.validateCreateUser,
  userController.createUser
);

// Post routes
router.get("/posts", postController.getAllPosts);
router.get("/users/:userId/posts", postController.getUserPosts);
router.post(
  "/posts",
  ValidationMiddleware.validateCreatePost,
  postController.createPost
);
router.put(
  "/posts/:id",
  ValidationMiddleware.validateUpdatePost,
  postController.updatePost
);
router.delete("/posts/:id", postController.deletePost);

export default router;
