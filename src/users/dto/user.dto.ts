import { PartialType } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { MinLength, MaxLength, IsEmail } from 'class-validator';

export class LoginUserDto {
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @MinLength(3)
  password: string;
}

export class CreateUserDto {
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @MinLength(3)
  password: string;

  @IsEmail()
  email: string;

  status?: number;
  isSuper?: number;
  roleId?: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class ResUser implements User {
  id: string;
  username: string;
  password: string;
  email: string;
  status: number;
  isSuper: number;
  createdAt: Date;
  updatedAt: Date;
  roleId: number;
}

export class ResUserHasToken implements User {
  id: string;
  username: string;
  password: string;
  email: string;
  status: number;
  isSuper: number;
  createdAt: Date;
  updatedAt: Date;
  roleId: number;
  access_token: string;
}
