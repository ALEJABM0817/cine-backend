import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cliente } from '../cliente/entities/cliente.entity';
import { Compra } from '../compra/entities/compra.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
    @InjectRepository(Compra)
    private compraRepo: Repository<Compra>,
  ) {}

  async login(email: string, password: string) {
    const user = await this.clienteRepo.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!user.activo) {
      throw new UnauthorizedException('Usuario no habilitado');
    }

    const isValid = await bcrypt.compare(password, user.contraseña);
    if (!isValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const compras = await this.compraRepo.find({
      where: { cliente: { id: user.id } },
      relations: ['horario', 'horario.pelicula', 'horario.sala'],
    });

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.rol,
    };

    const { contraseña, ...userData } = user;
    return {
      access_token: this.jwtService.sign(payload),
      role: user.rol,
      user: {
        ...userData,
        compras,
      },
    };
  }
}
