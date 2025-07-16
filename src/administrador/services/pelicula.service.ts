import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from '../entities/pelicula.entity';
import { CreatePeliculaDto } from '../dtos/create-pelicula.dto';
import { UpdatePeliculaDto } from '../dtos/update-pelicula.dto';
import { Horario } from '../../administrador/entities/horario.entity';

@Injectable()
export class PeliculaService {
  constructor(
    @InjectRepository(Pelicula)
    private peliculaRepo: Repository<Pelicula>,
  ) {}

  create(dto: CreatePeliculaDto, imagenUrl: string) {
    const nueva = this.peliculaRepo.create({ ...dto, imagenUrl });
    return this.peliculaRepo.save(nueva);
  }

  findAll() {
    return this.peliculaRepo.find();
  }

  findOne(id: number) {
    return this.peliculaRepo.findOne({ where: { id } });
  }

  

  async update(id: number, dto: UpdatePeliculaDto) {
    const pelicula = await this.peliculaRepo.findOne({ where: { id } });
    if (!pelicula) throw new NotFoundException('Película no encontrada');
    Object.assign(pelicula, dto);
    return this.peliculaRepo.save(pelicula);
  }

  async inhabilitar(id: number) {
    const pelicula = await this.peliculaRepo.findOne({ where: { id } });
    if (!pelicula) throw new NotFoundException('Película no encontrada');
    pelicula.habilitado = false;
    return this.peliculaRepo.save(pelicula);
  }

  async obtenerSedesConHorarios(idPelicula: number) {
  const horarios = await this.peliculaRepo.manager.find<Horario>(Horario, {
    where: {
      pelicula: {
        id: idPelicula,
      },
    },
    relations: ['sala', 'sala.sede'],
  });

  const agrupado = new Map<number, any>();

  for (const horario of horarios) {
    const sede = horario.sala.sede;

    if (!agrupado.has(sede.id)) {
      agrupado.set(sede.id, {
        sede: { id: sede.id, nombre: sede.nombre },
        horarios: [],
      });
    }

    agrupado.get(sede.id).horarios.push({
      id: horario.id,
      hora: horario.fecha,
      sala: { id: horario.sala.id, nombre: horario.sala.nombre },
    });
  }

  return Array.from(agrupado.values());
}
  
}
