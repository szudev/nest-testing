import { Tratamiento } from 'src/tratamiento/tratamiento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum EstadoTratamientoType {
  EN_CURSO = 'En curso',
  EN_PAUSA = 'En pausa',
  TERMINADO = 'Terminado',
}

@Entity()
export class EstadoTratamientoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: EstadoTratamientoType,
    default: EstadoTratamientoType.EN_CURSO,
    unique: true,
  })
  estado: EstadoTratamientoType;

  @OneToMany(() => Tratamiento, (tratamiento) => tratamiento.estado)
  tratamientos: Tratamiento[];
}
