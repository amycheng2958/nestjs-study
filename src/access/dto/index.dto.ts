import { PartialType } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateAccessDto {
  @MinLength(2)
  moduleName: string;
  parentId?: number;
  actionName?: string;
  type: number;
  url?: string;
  id?: number;
}

export class UpdateAccessDto extends PartialType(CreateAccessDto) {}
