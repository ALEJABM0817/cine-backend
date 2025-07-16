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
      relations: ['sala'],
    });

    if (!cliente || !pelicula || !horario) {
      throw new NotFoundException('Cliente, película o horario no encontrados');
    }

    const sala = horario.sala;

    if (sala.capacidad < dto.cantidadBoletos) {
      throw new BadRequestException('No hay suficientes boletos disponibles');
    }

    sala.capacidad -= dto.cantidadBoletos;
    await this.salaRepo.save(sala);

    const compra = this.compraRepo.create({
      cliente,
      horario,
      cantidadBoletos: dto.cantidadBoletos,
      fechaCompra: new Date(),
    });

    const nueva = await this.compraRepo.save(compra);

    console.log('Enviando correo a:', cliente.email);
    await sendMail(cliente.email, {
      asunto: 'Confirmación de compra de boletos',
      cuerpo: `
        Gracias por tu compra, ${cliente.nombre}.
        Película: ${pelicula.nombre}
        Fecha y hora: ${horario.fecha}
        Cantidad de boletos: ${dto.cantidadBoletos}
        Estado: Confirmado
      `,
    });

    return nueva;
  }

  getPeliculasDisponibles() {
    return this.peliculaRepo.find({ where: { estado: true } });
  }

  getCompraById(id: number) {
    return this.compraRepo.findOne({
      where: { id },
      relations: ['cliente', 'horario', 'horario.pelicula', 'horario.sala'],
    });
  }

  findAll() {
    return this.compraRepo.find({
      relations: ['cliente', 'horario', 'horario.pelicula', 'horario.sala'],
    });
  }
}
