import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccessService } from './access.service';
import { CreateAccessDto, UpdateAccessDto } from './dto/index.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
  async create(@Body() body: CreateAccessDto) {
    return this.accessService.create(body);
  }

  @Put(':id')
  async update(
    @Body() body: UpdateAccessDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.accessService.update(body, id);
  }

  @Get()
  async findMany() {
    return this.accessService.findMany();
  }
}
