import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, ResUser, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: CreateUserDto): Promise<ResUser> {
    return await this.prisma.user.create({
      data: userData,
    });
  }

  findOne(obj: object): Promise<ResUser> {
    return this.prisma.user.findUnique({
      where: {
        ...obj,
      },
    });
  }

  async findMany() {
    return await this.prisma.user.findMany({
      include: {
        role: true,
      },
    });
  }

  async update(data: UpdateUserDto, id: string) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
  async deleteMany() {
    return await this.prisma.user.deleteMany();
  }
}
