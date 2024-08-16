import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { EstadoTratamientoType } from '../estado_tratamiento.entity';

@Injectable()
export class EstadoValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value && !Object.values(EstadoTratamientoType).includes(value)) {
      throw new BadRequestException(
        `Estado no válido. Debe ser uno de los siguientes valores: ${Object.values(EstadoTratamientoType).join(', ')}`,
      );
    }
    return value as EstadoTratamientoType;
  }
}
