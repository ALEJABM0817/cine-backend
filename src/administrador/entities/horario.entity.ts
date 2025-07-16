import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Pelicula } from './pelicula.entity';
import { Sala } from './sala.entity';
import { Compra } from '../../compra/entities/compra.entity';

@Entity()
export class Horario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @ManyToOne(() => Pelicula, pelicula => pelicula.horarios)
  pelicula: Pelicula;

  @ManyToOne(() => Sala, sala => sala.horarios)
  sala: Sala;

  @OneToMany(() => Compra, compra => compra.horario)
  compras: Compra[];
}
