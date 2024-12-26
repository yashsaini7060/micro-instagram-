import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  title: string;

  @Column("text")
  description: string;

  @Column()
  userId: number;

  @Column("text", { array: true })
  images: string[];

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "userId" })
  user: User;
}
