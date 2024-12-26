export interface CreateUserDto {
  name: string;
  mobileNumber: string;
  address: string;
}

export interface CreatePostDto {
  title: string;
  description: string;
  userId: number;
  images: string[];
}

export interface UpdatePostDto {
  title?: string;
  description?: string;
  images?: string[];
}
