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

  async create(dto: CreateHorarioDto | CreateHorarioDto[]) {
    const datos = Array.isArray(dto) ? dto : [dto];
    const horarios: Horario[] = [];

    for (const item of datos) {
      const pelicula = await this.peliculaRepo.findOneBy({ id: item.peliculaId });
      const sala = await this.salaRepo.findOneBy({ id: item.salaId });

      if (!pelicula || !sala) {
        throw new NotFoundException('Pelicula o sala no encontrada');
      }

      const horario = this.horarioRepo.create({
        fecha: item.fecha,
        pelicula,
        sala,
      });

      horarios.push(horario);
    }

    return this.horarioRepo.save(horarios);
  }

  findAll() {
    return this.horarioRepo.find({
      relations: ['pelicula', 'sala'],
    });
  }
  
  async findOne(id: number) {
    const horario = await this.horarioRepo.findOne({
      where: { id },
      relations: ['pelicula', 'sala'],
    });
    if (!horario) {
      throw new NotFoundException('Horario no encontrado');
    }
    return horario;
  }
}
