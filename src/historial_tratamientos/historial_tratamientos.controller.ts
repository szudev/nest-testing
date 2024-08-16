import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HistorialTratamientosService } from './historial_tratamientos.service';

@Controller('historial-tratamientos')
export class HistorialTratamientosController {
  constructor(
    private historialTratamientoService: HistorialTratamientosService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllHistorialTratamientos() {
    return this.historialTratamientoService.getAllHistorialTratamientos();
  }
}
