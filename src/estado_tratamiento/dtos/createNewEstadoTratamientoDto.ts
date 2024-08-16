import { IsEnum, IsNotEmpty } from 'class-validator';
import { EstadoTratamientoType } from '../estado_tratamiento.entity';

export class CreateNewEstadoTratamientoDto {
  @IsNotEmpty()
  @IsEnum(EstadoTratamientoType)
  estado: EstadoTratamientoType;
}
