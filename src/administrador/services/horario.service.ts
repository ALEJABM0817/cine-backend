import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Horario } from '../entities/horario.entity';
import { CreateHorarioDto } from '../dtos/create-horario.dto';
import { Pelicula } from '../entities/pelicula.entity';
import { Sala } from '../entities/sala.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(Horario)
    private horarioRepo: Repository<Horario>,
    @InjectRepository(Pelicula)
    private peliculaRepo: Repository<Pelicula>,
    @InjectRepository(Sala)
    private salaRepo: Repository<Sala>,
  ) {}

  async create(dto: CreateHorarioDto) {
  const pelicula = await this.peliculaRepo.findOneBy({ id: dto.peliculaId });
  const sala = await this.salaRepo.findOneBy({ id: dto.salaId });

  if (!pelicula || !sala) {
    throw new NotFoundException('Pelicula o sala no encontrada');
  }

  const horario = this.horarioRepo.create({
    fecha: dto.fecha,
    pelicula,
    sala,
  });

  return this.horarioRepo.save(horario);
}

  findAll() {
    return this.horarioRepo.find({
      relations: ['pelicula', 'sala'],
    });
  }
}
