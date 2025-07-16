import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from '../entities/sala.entity';
import { CreateSalaDto } from '../dtos/create-sala.dto';
import { Sede } from '../entities/sede.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SalaService {
  constructor(
    @InjectRepository(Sala)
    private salaRepo: Repository<Sala>,
    @InjectRepository(Sede)
    private sedeRepo: Repository<Sede>,
  ) {}

  async create(dto: CreateSalaDto) {
  const sede = await this.sedeRepo.findOneBy({ id: dto.sedeId });

  if (!sede) {
    throw new NotFoundException('Sede no encontrada');
  }

  const sala = this.salaRepo.create({
    nombre: dto.nombre,
    capacidad: dto.capacidad,
    sede: sede,
  });

  return this.salaRepo.save(sala);
}

  findAll() {
    return this.salaRepo.find({ relations: ['sede'] });
  }
}
