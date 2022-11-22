import { Allow, IsNotEmpty } from 'class-validator';
export class CreateDogDto {
  @Allow()
  @IsNotEmpty()
  name: string;
  age: number;
}
