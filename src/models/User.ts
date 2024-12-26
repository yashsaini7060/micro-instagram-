import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @Column({ unique: true })
  mobileNumber: string;

  @Column("text")
  address: string;

  @Column({ default: 0 })
  postCount: number;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
