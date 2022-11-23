import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginResDto, LoginUserDto } from './dot/loginUser.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResDto> {
    console.log(1);
    const res = await this.usersService.findOne(loginUserDto);
    return Promise.resolve({
      token: 'd',
      ...res,
    });
  }

  @Get()
  getUser(): Promise<LoginUserDto> {
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
