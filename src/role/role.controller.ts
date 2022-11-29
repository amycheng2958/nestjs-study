import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';

@Controller('role')
@UseGuards(AuthGuard('jwt'))
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async query() {
    return this.roleService.findMany();
  }

  @Post()
  async create(@Body() body: CreateRoleDto) {
    const { title } = body;
    const role = await this.roleService.findOne(title);
    if (role) {
      throw new BadRequestException();
    }
    return this.roleService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.delete(id);
  }

  @Put(':id')
  async update(
    @Body() data: UpdateRoleDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.roleService.update(data, id);
  }
}
