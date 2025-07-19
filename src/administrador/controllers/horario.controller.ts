import { Controller, Post, Body, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { HorarioService } from '../services/horario.service';
import { CreateHorarioDto } from '../dtos/create-horario.dto';
import { JwtAuthGuard } from '../../auth/guard/JwtAuthGuard';

@Controller('horarios')
@UseGuards(JwtAuthGuard)
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Post()
  create(@Body() dto: CreateHorarioDto) {
    return this.horarioService.create(dto);
  }

  @Get()
  findAll() {
    return this.horarioService.findAll();
  }
  
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.horarioService.findOne(id);
  }
}
