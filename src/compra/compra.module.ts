import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraController } from './controllers/compra.controller';
import { CompraService } from './services/compra.service';
import { Compra } from './entities/compra.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Pelicula } from '../administrador/entities/pelicula.entity';
import { Horario } from '../administrador/entities/horario.entity';
import { AdministradorModule } from '../administrador/administrador.module';
import { ClienteModule } from '../cliente/cliente.module';
import { Sala } from '../administrador/entities/sala.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compra, Cliente, Pelicula, Horario, Sala]),
    ClienteModule,
    AdministradorModule,
  ],
  controllers: [CompraController],
  providers: [CompraService],
})
export class CompraModule {}
