import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateHorarioDto {
  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  @IsInt()
  peliculaId: number;

  @IsNotEmpty()
  @IsInt()
  salaId: number;
}
