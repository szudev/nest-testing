import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeletePacienteDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
