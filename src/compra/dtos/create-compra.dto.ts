import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePagoDto } from './create-pago.dto';

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

  @ValidateNested()
  @Type(() => CreatePagoDto)
  pago: CreatePagoDto;
}
