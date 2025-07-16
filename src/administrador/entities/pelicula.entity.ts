import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Horario } from './horario.entity';

@Entity()
export class Pelicula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  imagenUrl: string;

  @Column({ default: true })
  habilitado: boolean;

  @Column()
  nombre: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Horario, horario => horario.pelicula)
  horarios: Horario[];
}
