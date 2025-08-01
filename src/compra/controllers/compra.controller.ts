import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CompraService } from '../services/compra.service';
import { CreateCompraDto } from '../dtos/create-compra.dto';
import { JwtAuthGuard } from '../../auth/guard/JwtAuthGuard';

@Controller('compras')
@UseGuards(JwtAuthGuard)
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post()
  create(@Body() dto: CreateCompraDto) {
    return this.compraService.create(dto);
  }

   @Get()
  findAll() {
    return this.compraService.findAll();
  }
}
