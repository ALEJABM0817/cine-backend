import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Compra } from '../../compra/entities/compra.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  telefono: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contraseña: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ default: 'cliente' })
  rol: 'cliente';

  @OneToMany(() => Compra, compra => compra.cliente)
  compras: Compra[];
}
