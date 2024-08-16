import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Paciente } from '../paciente/paciente.entity';
import { Tratamiento } from '../tratamiento/tratamiento.entity';
import { EstadoTratamientoType } from 'src/estado_tratamiento/estado_tratamiento.entity';

@Entity()
export class HistorialTratamiento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Tratamiento,
    (tratamiento) => tratamiento.historial_tratamiento,
  )
  tratamiento: Tratamiento;

  @ManyToOne(() => Paciente, (paciente) => paciente.historial_tratamiento)
  paciente: Paciente;

  @Column()
  descripcion: string;

  @Column()
  fecha_inicio: Date;

  @Column()
  fecha_termino: Date;

  @Column({
    type: 'enum',
    enum: EstadoTratamientoType,
    default: EstadoTratamientoType.EN_CURSO,
  })
  estado: EstadoTratamientoType;
}
