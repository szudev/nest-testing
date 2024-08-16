import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsFutureDate } from '../decorators/isFutureDate.decorator';
import { IsDateAfter } from '../decorators/isDateAfter.decorator';
import { Type } from 'class-transformer';

export class CreateTratamientoDto {
  @IsNotEmpty()
  @IsUUID()
  paciente_id: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @IsFutureDate({
    message: 'La fecha de inicio debe ser una fecha igual o mayor a la actual',
  })
  fecha_inicio: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @IsDateAfter('fecha_inicio', {
    message: 'La fecha de término debe ser posterior a la fecha de inicio.',
  })
  fecha_termino: Date;
}
