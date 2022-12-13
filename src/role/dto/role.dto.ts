import { PartialType } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
import { CreateAccessDto } from 'src/access/dto/index.dto';

export class CreateRoleDto {
  @MinLength(2)
  title: string;
  description?: string;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  access?: CreateAccessDto[];
}
