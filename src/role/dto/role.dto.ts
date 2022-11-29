import { PartialType } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateRoleDto {
  @MinLength(2)
  title: string;

  description?: string;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
