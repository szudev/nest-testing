import { Module } from '@nestjs/common';
import { EstadoTratamientoController } from './estado_tratamiento.controller';
import { EstadoTratamientoService } from './estado_tratamiento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoTratamientoEntity } from './estado_tratamiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoTratamientoEntity])],
  controllers: [EstadoTratamientoController],
  providers: [EstadoTratamientoService],
  exports: [TypeOrmModule.forFeature([EstadoTratamientoEntity])],
})
export class EstadoTratamientoModule {}
