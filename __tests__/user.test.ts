import request from "supertest";
import { app } from "../app";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

describe("User API", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(User).clear();
  });

  describe("GET /users", () => {
    it("should return all users", async () => {
      const userRepository = AppDataSource.getRepository(User);
      await userRepository.save([
        {
          name: "Test User 1",
          mobileNumber: "1234567890",
          address: "Test Address 1",
          postCount: 0,
        },
        {
          name: "Test User 2",
          mobileNumber: "0987654321",
          address: "Test Address 2",
          postCount: 0,
        },
      ]);

      const response = await request(app).get("/api/users");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });
});
