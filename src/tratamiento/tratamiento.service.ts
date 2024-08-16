import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tratamiento } from './tratamiento.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateTratamientoDto } from './dtos/CreateTratamientoDto';
import { Paciente } from '../paciente/paciente.entity';
import { HistorialTratamiento } from '../historial_tratamientos/historial_tratamiento.entity';
import {
  EstadoTratamientoEntity,
  EstadoTratamientoType,
} from 'src/estado_tratamiento/estado_tratamiento.entity';

@Injectable()
export class TratamientoService {
  constructor(
    @InjectRepository(Tratamiento)
    private tratamientoRepository: Repository<Tratamiento>,
    @InjectRepository(Paciente)
    private pacienteReposity: Repository<Paciente>,
    @InjectRepository(HistorialTratamiento)
    private historialTratamientoRepository: Repository<HistorialTratamiento>,
    @InjectRepository(EstadoTratamientoEntity)
    private estadoTratamientoRepository: Repository<EstadoTratamientoEntity>,
    private dataSource: DataSource,
  ) {}

  async getAllTratamientos() {
    try {
      const tratamientos = await this.tratamientoRepository.find({
        relations: {
          estado: true,
        },
      });
      const formattedTratamientos = tratamientos.map((t) => {
        const estadoTratamiento = t.estado.estado;
        return { ...t, estado: estadoTratamiento };
      });
      return formattedTratamientos;
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

  async createNewTratamiento(dto: CreateTratamientoDto) {
    let queryRunner: QueryRunner;

    try {
      queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      const existingPaciente = await this.pacienteReposity.findOne({
        where: { id: dto.paciente_id },
      });

      if (!existingPaciente) {
        throw new NotFoundException(
          'El id del paciente especificado no existe.',
        );
      }

      const estadoTratamiento = await this.estadoTratamientoRepository.findOne({
        where: {
          estado: EstadoTratamientoType.EN_CURSO,
        },
      });

      if (!estadoTratamiento)
        throw new InternalServerErrorException(
          'El estado de tratamiento por defecto no existe.',
        );

      const newTratamiento = this.tratamientoRepository.create({
        nombre: dto.nombre,
        paciente: existingPaciente,
        descripcion: dto.descripcion,
        estado: estadoTratamiento,
        fecha_inicio: dto.fecha_inicio,
        fecha_termino: dto.fecha_termino,
      });

      await queryRunner.manager.save(newTratamiento);

      const newHistorialTratamiento =
        this.historialTratamientoRepository.create({
          paciente: existingPaciente,
          tratamiento: newTratamiento,
          estado: estadoTratamiento.estado,
          descripcion: newTratamiento.descripcion,
          fecha_inicio: newTratamiento.fecha_inicio,
          fecha_termino: newTratamiento.fecha_termino,
        });

      await queryRunner.manager.save(newHistorialTratamiento);

      //Se completa la transaccion, realizando los cambios en la base de datos
      await queryRunner.commitTransaction();

      return newTratamiento;
    } catch (error) {
      if (queryRunner) {
        await queryRunner.rollbackTransaction();
      }
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
    } finally {
      if (queryRunner) await queryRunner.release();
    }
  }
}
