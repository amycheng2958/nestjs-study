import { Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from './dot/loginUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
    // const res = await this.usersService.findOne(loginUserDto);
    // return Promise.resolve({
    //   token: 'd',
    //   ...res,
    // });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
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
