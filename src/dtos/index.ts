import {
  IsString,
  IsNumber,
  IsArray,
  Length,
  IsOptional,
  IsNotEmpty,
  Min,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(1, 256)
  name!: string;

  @IsString()
  @IsNotEmpty()
  mobileNumber!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;
}

export class UpdateUserDto {
  @IsString()
  @Length(1, 256)
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  mobileNumber?: string;

  @IsString()
  @IsOptional()
  address?: string;
}

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(1)
  userId!: number;

  @IsArray()
  @IsString({ each: true })
  images!: string[];
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
