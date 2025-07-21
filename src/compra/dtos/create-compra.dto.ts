import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCompraDto {
  @IsInt()
  clienteId: number;

  @IsInt()
  peliculaId: number;

  @IsNotEmpty()
  @IsInt()
  horarioId: number;

  @IsNotEmpty()
  @IsInt()
  cantidadBoletos: number;

  @IsNotEmpty()
  @IsInt()
  precioTotal: number;
}
