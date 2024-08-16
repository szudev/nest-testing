import { Tratamiento } from 'src/tratamiento/tratamiento.entity';
import { HistorialTratamiento } from '../historial_tratamientos/historial_tratamiento.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @OneToMany(() => Tratamiento, (tratamiento) => tratamiento.paciente)
  tratamientos: Tratamiento[];

  @OneToMany(() => HistorialTratamiento, (historial) => historial.paciente)
  historial_tratamiento: HistorialTratamiento[];
}
