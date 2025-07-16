import { IsNotEmpty, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSalaDto } from './create-sala.dto';

export class CreateSedeDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSalaDto)
  salas: CreateSalaDto[];
}
