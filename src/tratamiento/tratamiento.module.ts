import { Module } from '@nestjs/common';
import { TratamientoController } from './tratamiento.controller';
import { TratamientoService } from './tratamiento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tratamiento } from './tratamiento.entity';
import { PacienteModule } from 'src/paciente/paciente.module';
import { HistorialTratamientosModule } from 'src/historial_tratamientos/historial_tratamientos.module';
import { EstadoTratamientoModule } from 'src/estado_tratamiento/estado_tratamiento.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tratamiento]),
    PacienteModule,
    HistorialTratamientosModule,
    EstadoTratamientoModule,
  ],
  controllers: [TratamientoController],
  providers: [TratamientoService],
})
export class TratamientoModule {}
