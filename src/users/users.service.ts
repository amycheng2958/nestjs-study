import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  findOne(loginUserDto): Promise<User> {
    return Promise.resolve({
      id: 1,
      username: 'd',
      password: 'dd',
      email: 'ss',
      status: 1,
      isSuper: 0,
      createdAt: new Date(),
      roleId: 1,
      Role: 'dd',
    });
  }
}
