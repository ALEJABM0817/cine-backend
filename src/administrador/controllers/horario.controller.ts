import { Controller, Post, Body, Get } from '@nestjs/common';
import { HorarioService } from '../services/horario.service';
import { CreateHorarioDto } from '../dtos/create-horario.dto';

@Controller('horarios')
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
}
