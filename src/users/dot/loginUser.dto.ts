import { User } from '@prisma/client';
import { MinLength, MaxLength } from 'class-validator';

export class LoginUserDto {
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @MinLength(3)
  password: string;
}

export class LoginResDto implements User {
  id: number;
  username: string;
  password: string;
  email: string;
  status: number;
  isSuper: number;
  createdAt: Date;
  roleId: number;
  token: string;
}
