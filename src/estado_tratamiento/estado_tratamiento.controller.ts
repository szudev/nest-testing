import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { EstadoTratamientoService } from './estado_tratamiento.service';
import { EstadoValidationPipe } from './pipes/estadoValidationPipe';
import { EstadoTratamientoType } from './estado_tratamiento.entity';
import { CreateNewEstadoTratamientoDto } from './dtos/createNewEstadoTratamientoDto';

@Controller('estado-tratamiento')
export class EstadoTratamientoController {
  constructor(private EstadoTratamientoService: EstadoTratamientoService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllEstadoTratamientos() {
    return this.EstadoTratamientoService.getAllEstadoTratamientos();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':estado')
  @UsePipes(EstadoValidationPipe)
  async getEstadoTratamientoByEstado(
    @Param('estado') estado: EstadoTratamientoType,
  ) {
    return this.EstadoTratamientoService.getAllEstadoTratamientosByEstado(
      estado,
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createNewEstadoTratamiento(@Body() dto: CreateNewEstadoTratamientoDto) {
    return this.EstadoTratamientoService.createNewEstadoTratamiento(dto.estado);
  }
}
