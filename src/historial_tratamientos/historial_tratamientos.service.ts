import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialTratamiento } from './historial_tratamiento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistorialTratamientosService {
  constructor(
    @InjectRepository(HistorialTratamiento)
    private historialTratamientoRepository: Repository<HistorialTratamiento>,
  ) {}

  async getAllHistorialTratamientos() {
    try {
      const historial = await this.historialTratamientoRepository.find();
      return historial;
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
