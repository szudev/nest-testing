import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dtos/createPacienteDto';
import { DeletePacienteDto } from './dtos/deletePacienteDto';

@Controller('paciente')
export class PacienteController {
  constructor(private pacienteService: PacienteService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllPacientes() {
    return this.pacienteService.getAllPacientes();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createNewPaciente(@Body() dto: CreatePacienteDto) {
    return this.pacienteService.createNewPaciente(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  async deletePacienteById(@Body() dto: DeletePacienteDto) {
    return this.pacienteService.deletePacienteById(dto);
  }
}
