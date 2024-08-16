import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EstadoTratamientoEntity,
  EstadoTratamientoType,
} from './estado_tratamiento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoTratamientoService {
  constructor(
    @InjectRepository(EstadoTratamientoEntity)
    private estadoTratamientoRepository: Repository<EstadoTratamientoEntity>,
  ) {}

  async getAllEstadoTratamientos() {
    try {
      const estados = await this.estadoTratamientoRepository.find();
      return estados;
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

  async getAllEstadoTratamientosByEstado(estado: EstadoTratamientoType) {
    try {
      const tratamientos = await this.estadoTratamientoRepository.find({
        where: {
          estado,
        },
        select: {
          tratamientos: true,
        },
      });
      return tratamientos;
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

  async createNewEstadoTratamiento(estado: EstadoTratamientoType) {
    try {
      const newEstado = await this.estadoTratamientoRepository.insert({
        estado,
      });
      return newEstado.raw;
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
