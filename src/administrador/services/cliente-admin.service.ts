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
    return this.clienteRepo.find({ where: { rol: 'cliente' } });
  }

  async inhabilitar(id: number) {
    const cliente = await this.clienteRepo.findOneBy({ id });
    if (!cliente) return null;

    cliente.activo = false;
    return this.clienteRepo.save(cliente);
  }

  async habilitar(id: number) {
    const cliente = await this.clienteRepo.findOneBy({ id });
    if (!cliente) return null;

    cliente.activo = true;
    return this.clienteRepo.save(cliente);
  }
}
