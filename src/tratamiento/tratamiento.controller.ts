import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TratamientoService } from './tratamiento.service';
import { CreateTratamientoDto } from './dtos/CreateTratamientoDto';

@Controller('tratamiento')
export class TratamientoController {
  constructor(private tratamientoService: TratamientoService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllTratamientos() {
    return this.tratamientoService.getAllTratamientos();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createNewTratamiento(@Body() dto: CreateTratamientoDto) {
    return this.tratamientoService.createNewTratamiento(dto);
  }
}
