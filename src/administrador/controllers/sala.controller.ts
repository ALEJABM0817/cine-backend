import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { SalaService } from '../services/sala.service';
import { CreateSalaDto } from '../dtos/create-sala.dto';
import { JwtAuthGuard } from '../../auth/guard/JwtAuthGuard';

@Controller('salas')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateSalaDto) {
    return this.salaService.create(dto);
  }

  @Get()
  findAll() {
    return this.salaService.findAll();
  }
}
