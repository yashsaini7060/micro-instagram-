import request from "supertest";
import { app } from "../../app";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";

describe("User Integration Tests", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(User).clear();
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const userData = {
        name: "Test User",
        mobileNumber: "1234567890",
        address: "Test Address",
      };

      const response = await request(app).post("/api/users").send(userData);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(userData.name);
      expect(response.body.postCount).toBe(0);
    });

    it("should validate unique mobile number", async () => {
      const userData = {
        name: "Test User",
        mobileNumber: "1234567890",
        address: "Test Address",
      };

      // Create first user
      await request(app).post("/api/users").send(userData);

      // Try to create second user with same mobile number
      const response = await request(app).post("/api/users").send(userData);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("mobile number already exists");
    });
  });

  // Add more integration tests...
});
