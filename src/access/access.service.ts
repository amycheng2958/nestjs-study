import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccessDto, UpdateAccessDto } from './dto/index.dto';

@Injectable()
export class AccessService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAccessDto) {
    return await this.prisma.access.create({ data });
  }

  async update(data: UpdateAccessDto, id: number) {
    return await this.prisma.access.update({
      data,
      where: { id },
    });
  }

  async findMany() {
    return await this.prisma.access.findMany({
      include: {
        children: true,
      },
    });
  }
}
