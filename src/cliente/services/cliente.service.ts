import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
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
    try {
      return await this.clienteRepo.save(cliente);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('El correo ya está registrado');
      }
      throw error;
    }
  }
}
