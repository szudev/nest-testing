import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';
import { Repository } from 'typeorm';
import { CreatePacienteDto } from './dtos/createPacienteDto';
import { DeletePacienteDto } from './dtos/deletePacienteDto';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private usersRepository: Repository<Paciente>,
  ) {}

  async getAllPacientes(): Promise<Paciente[]> {
    try {
      const pacientes = await this.usersRepository.find();
      return pacientes;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          statusCode: error.status,
        },
        error.status,
        {
          cause: error.message,
        },
      );
    }
  }

  async createNewPaciente(pacienteDto: CreatePacienteDto) {
    try {
      const foundPaciente = await this.usersRepository.findOne({
        where: { nombre: pacienteDto.nombre },
      });
      if (foundPaciente) throw new ConflictException('El paciente ya existe');
      const newPaciente = await this.usersRepository.insert({
        nombre: pacienteDto.nombre,
      });

      return newPaciente.raw;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          statusCode: error.status,
        },
        error.status,
        {
          cause: error.message,
        },
      );
    }
  }

  async deletePacienteById(pacienteDto: DeletePacienteDto) {
    try {
      const deletedPaciente = await this.usersRepository.delete(pacienteDto.id);
      return deletedPaciente;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          statusCode: error.status,
        },
        error.status,
        {
          cause: error.message,
        },
      );
    }
  }
}
