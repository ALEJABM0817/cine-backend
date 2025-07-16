import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sede } from '../entities/sede.entity';
import { Sala } from '../entities/sala.entity';
import { CreateSedeDto } from '../dtos/create-sede.dto';

@Injectable()
export class SedeService {
  constructor(
    @InjectRepository(Sede)
    private sedeRepo: Repository<Sede>,
    @InjectRepository(Sala)
    private salaRepo: Repository<Sala>,
  ) {}

  async create(dto: CreateSedeDto) {
    const sede = this.sedeRepo.create({ nombre: dto.nombre });
    const savedSede = await this.sedeRepo.save(sede);

    const salas = dto.salas.map((salaDto: { nombre: string; capacidad: number }) => {
      const sala = this.salaRepo.create({
        nombre: salaDto.nombre,
        capacidad: salaDto.capacidad,
        sede: savedSede,
      });
      return sala;
    });

    await this.salaRepo.save(salas);
    return this.sedeRepo.findOne({ where: { id: savedSede.id }, relations: ['salas'] });
  }

  findAll() {
    return this.sedeRepo.find({ relations: ['salas'] });
  }
}
