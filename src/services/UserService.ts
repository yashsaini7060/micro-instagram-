import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import { CreateUserDto } from "../dtos";
import { NotFoundError } from "../utils/errors";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async updatePostCount(userId: number, increment: boolean): Promise<void> {
    const user = await this.getUserById(userId);
    user.postCount += increment ? 1 : -1;
    await this.userRepository.save(user);
  }
}
