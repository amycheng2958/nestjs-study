import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    return await this.prisma.role.findMany({
      include: {
        access: true,
      },
    });
  }

  async findUnique(id: number) {
    return await this.prisma.role.findUnique({
      where: { id },
      include: {
        access: true,
      },
    });
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
    // 如果access的id在权限表中不存在，会出错，怎么处理错误
    const { access = [] } = data;
    return await this.prisma.role.update({
      where: { id },
      data: {
        access: {
          connect: access.map((item) => ({
            id: item.id,
          })),
        },
      },
      include: {
        access: true,
      },
    });
  }
}
