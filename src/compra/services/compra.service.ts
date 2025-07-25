import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from '../entities/compra.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Pelicula } from '../../administrador/entities/pelicula.entity';
import { Horario } from '../../administrador/entities/horario.entity';
import { Sala } from '../../administrador/entities/sala.entity';
import { CreateCompraDto } from '../dtos/create-compra.dto';
import { sendMail } from '../../utils/mailer';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private compraRepo: Repository<Compra>,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
    @InjectRepository(Pelicula)
    private peliculaRepo: Repository<Pelicula>,
    @InjectRepository(Horario)
    private horarioRepo: Repository<Horario>,
    @InjectRepository(Sala)
    private salaRepo: Repository<Sala>,
  ) {}

  async create(dto: CreateCompraDto) {
    const cliente = await this.clienteRepo.findOneBy({ id: dto.clienteId });
    const pelicula = await this.peliculaRepo.findOneBy({ id: dto.peliculaId });

    const horario = await this.horarioRepo.findOne({
      where: { id: dto.horarioId },
      relations: ['sala', 'sala.sede'],
    });

    if (!cliente || !pelicula || !horario) {
      throw new NotFoundException('Cliente, película o horario no encontrados');
    }

    const sala = horario.sala;

    if (horario.asientosDisponibles < dto.cantidadBoletos) {
      throw new BadRequestException('No hay suficientes boletos disponibles');
    }

    horario.asientosDisponibles -= dto.cantidadBoletos;
    await this.horarioRepo.save(horario);

    const compra = this.compraRepo.create({
      cliente,
      horario,
      cantidadBoletos: dto.cantidadBoletos,
      fechaCompra: new Date(),
    });

    const nueva = await this.compraRepo.save(compra);

    const bodyLines = [
      `Hola ${cliente.nombre}, gracias por tu compra de los boletos para la Película: ${pelicula.titulo} en la Sede: ${sala.sede.nombre}, Sala: ${sala.nombre}`,
      `Fecha y hora: ${horario.fecha}`,
      `Cantidad de boletos: ${dto.cantidadBoletos}`,
      `Estado: Confirmado`,
    ];
    await sendMail(cliente.email, {
      asunto: 'Confirmación compra de boletos CineApp',
      cuerpo: bodyLines.join('\n'),
    });

    return nueva;
  }

  findAll() {
    return this.compraRepo.find({
      relations: ['cliente', 'horario', 'horario.pelicula', 'horario.sala'],
    });
  }
}
