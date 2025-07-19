import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePeliculaDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;
}
