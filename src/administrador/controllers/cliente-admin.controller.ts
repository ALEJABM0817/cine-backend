import { Controller, Get, Patch, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ClienteAdminService } from '../services/cliente-admin.service';
import { JwtAuthGuard } from '../../auth/guard/JwtAuthGuard';

@Controller('admin/clientes')
@UseGuards(JwtAuthGuard)
export class ClienteAdminController {
  constructor(private readonly clienteAdminService: ClienteAdminService) {}

  @Get()
  findAll() {
    return this.clienteAdminService.findAll();
  }

  @Patch(':id/inhabilitar')
  inhabilitar(@Param('id', ParseIntPipe) id: number) {
    return this.clienteAdminService.inhabilitar(id);
  }

  @Patch(':id/habilitar')
  habilitar(@Param('id', ParseIntPipe) id: number) {
    return this.clienteAdminService.habilitar(id);
  }
}