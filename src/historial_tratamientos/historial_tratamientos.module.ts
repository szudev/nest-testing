import { Module } from '@nestjs/common';
import { HistorialTratamientosController } from './historial_tratamientos.controller';
import { HistorialTratamientosService } from './historial_tratamientos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialTratamiento } from './historial_tratamiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialTratamiento])],
  controllers: [HistorialTratamientosController],
  providers: [HistorialTratamientosService],
  exports: [TypeOrmModule.forFeature([HistorialTratamiento])],
})
export class HistorialTratamientosModule {}
