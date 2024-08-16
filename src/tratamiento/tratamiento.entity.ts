import { Paciente } from 'src/paciente/paciente.entity';
import { HistorialTratamiento } from '../historial_tratamientos/historial_tratamiento.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EstadoTratamientoEntity } from 'src/estado_tratamiento/estado_tratamiento.entity';

@Entity()
export class Tratamiento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  fecha_inicio: Date;

  @Column()
  fecha_termino: Date;

  @Column()
  descripcion: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.tratamientos)
  paciente: Paciente;

  @OneToMany(() => HistorialTratamiento, (historial) => historial.tratamiento)
  historial_tratamiento: HistorialTratamiento[];

  @ManyToOne(
    () => EstadoTratamientoEntity,
    (estadoTratamiento) => estadoTratamiento.id,
  )
  estado: EstadoTratamientoEntity;
}
