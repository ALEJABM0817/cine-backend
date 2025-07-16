import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePagoDto {
  @IsString()
  metodo: string;

  @IsString()
  numeroTarjeta: string;

  @IsString()
  nombreTitular: string;

  @IsString()
  fechaExpiracion: string;

  @IsString()
  codigoSeguridad: string;
}
