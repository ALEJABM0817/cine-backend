import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cliente } from '../../cliente/entities/cliente.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
  ) {}

  async login(email: string, password: string) {
    const user = await this.clienteRepo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!user.activo) {
      throw new ForbiddenException('Usuario no habilitado');
    }

    const isValid = await bcrypt.compare(password, user.contraseña);
    if (!isValid) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.rol,
    };

    const { contraseña, ...userData } = user;
    return {
      access_token: this.jwtService.sign(payload),
      role: user.rol,
      user: userData,
    };
  }
}
