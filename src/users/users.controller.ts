import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  BadRequestException,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
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

  @Put(':id')
  async update(@Body() userData: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.update(userData, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Delete()
  async deleteMany() {
    return this.usersService.deleteMany();
  }

  @Get()
  async findMany() {
    return this.usersService.findMany();
  }
}
