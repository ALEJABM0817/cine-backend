import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateSalaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsInt()
  capacidad: number;

  @IsNotEmpty()
  @IsInt()
  sedeId: number;
}
