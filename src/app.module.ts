import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradorModule } from './administrador/administrador.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClienteModule } from './cliente/cliente.module';
import { CompraModule } from './compra/compra.module';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3307'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
  }),
  AdministradorModule,
  AuthModule,
  ClienteModule,
  CompraModule
  ],
})
export class AppModule {}
