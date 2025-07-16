import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteAdminService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
  ) {}

  findAll() {
    return this.clienteRepo.find();
  }

  async inhabilitar(id: number) {
    const cliente = await this.clienteRepo.findOneBy({ id });
    if (!cliente) return null;

    cliente.activo = false;
    return this.clienteRepo.save(cliente);
  }
}
