import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { PeliculaController } from './controllers/pelicula.controller';
import { PeliculaService } from './services/pelicula.service';
import { Sede } from './entities/sede.entity';
import { SedeController } from './controllers/sede.controller';
import { SedeService } from './services/sede.service';
import { Sala } from './entities/sala.entity';
import { SalaController } from './controllers/sala.controller';
import { SalaService } from './services/sala.service';
import { Horario } from './entities/horario.entity';
import { HorarioController } from './controllers/horario.controller';
import { HorarioService } from './services/horario.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ClienteModule } from '../cliente/cliente.module';
import { Cliente } from '../cliente/entities/cliente.entity';
import { ClienteAdminService } from './services/cliente-admin.service';
import { ClienteAdminController } from './controllers/cliente-admin.controller';


@Module({
  imports: [TypeOrmModule.forFeature([
      Pelicula,
      Sede,
      Sala,
      Horario,
      Cliente
    ]),
  ClienteModule,
  CloudinaryModule],
  controllers: [
    PeliculaController,
    PeliculaController,
    SedeController,
    SalaController,
    HorarioController,
    ClienteAdminController
  ],
  providers: [
    PeliculaService,
    PeliculaService,
    SedeService,
    SalaService,
    HorarioService,
    ClienteAdminService
  ]
})
export class AdministradorModule {}
