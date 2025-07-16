import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePeliculaDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;
}
