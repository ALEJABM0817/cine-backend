import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Sede } from './sede.entity';
import { Horario } from './horario.entity';

@Entity()
export class Sala {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  capacidad: number;

  @ManyToOne(() => Sede, sede => sede.salas)
  sede: Sede;

  @OneToMany(() => Horario, horario => horario.sala)
  horarios: Horario[];
}
