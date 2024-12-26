import request from "supertest";
import { app } from "../app";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Post } from "../entities/Post";

describe("Post API", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(Post).clear();
    await AppDataSource.getRepository(User).clear();
  });

  describe("POST /posts", () => {
    it("should create a new post", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.save({
        name: "Test User",
        mobileNumber: "1234567890",
        address: "Test Address",
        postCount: 0,
      });

      const response = await request(app)
        .post("/api/posts")
        .send({
          title: "Test Post",
          description: "Test Description",
          userId: user.id,
          images: ["image1.jpg"],
        });

      expect(response.status).toBe(201);
      expect(response.body.title).toBe("Test Post");

      const updatedUser = await userRepository.findOne({
        where: { id: user.id },
      });
      expect(updatedUser?.postCount).toBe(1);
    });
  });

  describe("PUT /posts/:id", () => {
    it("should update a post", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const postRepository = AppDataSource.getRepository(Post);

      const user = await userRepository.save({
        name: "Test User",
        mobileNumber: "1234567890",
        address: "Test Address",
        postCount: 0,
      });

      const post = await postRepository.save({
        title: "Original Title",
        description: "Original Description",
        userId: user.id,
        images: ["image1.jpg"],
      });

      const response = await request(app)
        .put(`/api/posts/${post.id}`)
        .send({
          title: "Updated Title",
          description: "Updated Description",
          images: ["image2.jpg"],
        });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Updated Title");
    });
  });

  describe("DELETE /posts/:id", () => {
    it("should delete a post and decrease user post count", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const postRepository = AppDataSource.getRepository(Post);

      const user = await userRepository.save({
        name: "Test User",
        mobileNumber: "1234567890",
        address: "Test Address",
        postCount: 1,
      });

      const post = await postRepository.save({
        title: "Test Post",
        description: "Test Description",
        userId: user.id,
        images: ["image1.jpg"],
      });

      const response = await request(app).delete(`/api/posts/${post.id}`);
      expect(response.status).toBe(204);

      const updatedUser = await userRepository.findOne({
        where: { id: user.id },
      });
      expect(updatedUser?.postCount).toBe(0);
    });
  });
});
