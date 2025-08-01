import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { SedeService } from '../services/sede.service';
import { CreateSedeDto } from '../dtos/create-sede.dto';
import { JwtAuthGuard } from '../../auth/guard/JwtAuthGuard';

@Controller('sedes')
@UseGuards(JwtAuthGuard)
export class SedeController {
  constructor(private readonly sedeService: SedeService) {}

  @Post()
  create(@Body() dto: CreateSedeDto) {
    return this.sedeService.create(dto);
  }

  @Get()
  findAll() {
    return this.sedeService.findAll();
  }
}
