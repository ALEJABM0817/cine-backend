import { Controller, Post, Body, Get } from '@nestjs/common';
import { SalaService } from '../services/sala.service';
import { CreateSalaDto } from '../dtos/create-sala.dto';

@Controller('salas')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Post()
  create(@Body() dto: CreateSalaDto) {
    return this.salaService.create(dto);
  }

  @Get()
  findAll() {
    return this.salaService.findAll();
  }
}
