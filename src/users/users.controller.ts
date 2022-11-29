import {
  Request,
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  BadRequestException,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, ResUserHasToken, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: '新增用户' })
  @Post()
  async register(@Body() userData: CreateUserDto) {
    const { username, email } = userData;
    const user = await this.usersService.findOne({ username });
    const e = await this.usersService.findOne({ email });
    if (user || e) {
      throw new BadRequestException();
    }
    return this.usersService.create(userData);
  }

  @ApiOperation({ summary: '用户登录' })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req): Promise<ResUserHasToken> {
    return this.authService.login(req.user);
  }

  @Put(':id')
  async update(
    @Body() userData: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.update(userData, id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
