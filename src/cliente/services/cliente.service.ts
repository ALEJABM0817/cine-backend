import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { CreateClienteDto } from '../dtos/create-cliente.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
  ) {}

  async create(dto: CreateClienteDto) {
    const hashedPassword = await bcrypt.hash(dto.contraseña, 10);
    const cliente = this.clienteRepo.create({
      ...dto,
      contraseña: hashedPassword,
    });
    return this.clienteRepo.save(cliente);
  }
}
