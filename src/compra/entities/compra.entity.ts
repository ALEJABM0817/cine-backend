import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Horario } from '../../administrador/entities/horario.entity';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, cliente => cliente.compras)
  cliente: Cliente;

  @ManyToOne(() => Horario, horario => horario.compras)
  horario: Horario;

  @Column()
  cantidadBoletos: number;

  @CreateDateColumn()
  fechaCompra: Date;
}
