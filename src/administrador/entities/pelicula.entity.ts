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
  estado: boolean;
  
  @Column({default: 0})
  precio: number;
  
  @OneToMany(() => Horario, horario => horario.pelicula)
  horarios: Horario[];
}
