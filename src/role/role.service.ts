import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    return await this.prisma.role.findMany();
  }

  async create(data: CreateRoleDto) {
    return await this.prisma.role.create({
      data,
    });
  }

  async delete(id: number) {
    return await this.prisma.role.delete({
      where: {
        id,
      },
    });
  }

  async findOne(title: string) {
    return await this.prisma.role.findUnique({
      where: {
        title,
      },
    });
  }
  async update(data: UpdateRoleDto, id: number) {
    return await this.prisma.role.update({ where: { id }, data });
  }
}
