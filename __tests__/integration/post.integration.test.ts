import request from "supertest";
import { app } from "../../app.ts";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import { Post } from "../../entities/Post";

describe("Post Integration Tests", () => {
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

  describe("POST /api/posts", () => {
    it("should create a post and increment user post count", async () => {
      // Create a user first
      const user = await AppDataSource.getRepository(User).save({
        name: "Test User",
        mobileNumber: "1234567890",
        address: "Test Address",
        postCount: 0,
      });

      const postData = {
        title: "Test Post",
        description: "Test Description",
        userId: user.id,
        images: ["test-image.jpg"],
      };

      const response = await request(app).post("/api/posts").send(postData);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(postData.title);

      // Verify user's post count was incremented
      const updatedUser = await AppDataSource.getRepository(User).findOne({
        where: { id: user.id },
      });
      expect(updatedUser?.postCount).toBe(1);
    });
  });

  // Add more integration tests...
});
