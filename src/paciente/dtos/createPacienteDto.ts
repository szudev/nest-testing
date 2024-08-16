import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePacienteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
