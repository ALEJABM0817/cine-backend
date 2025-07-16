import { Controller, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { ClienteAdminService } from '../services/cliente-admin.service';

@Controller('admin/clientes')
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
}
