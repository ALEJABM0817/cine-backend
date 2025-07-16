import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CompraService } from '../services/compra.service';
import { CreateCompraDto } from '../dtos/create-compra.dto';

@Controller('compras')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post()
  create(@Body() dto: CreateCompraDto) {
    return this.compraService.create(dto);
  }

  @Get('peliculas')
  getPeliculas() {
    return this.compraService.getPeliculasDisponibles();
  }

  @Get(':id')
  getCompra(@Param('id') id: number) {
    return this.compraService.getCompraById(id);
  }

   @Get()
  findAll() {
    return this.compraService.findAll();
  }
}
