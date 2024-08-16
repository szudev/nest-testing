import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from './paciente/paciente.module';
import { Paciente } from './paciente/paciente.entity';
import { TratamientoModule } from './tratamiento/tratamiento.module';
import { Tratamiento } from './tratamiento/tratamiento.entity';
import { HistorialTratamientosModule } from './historial_tratamientos/historial_tratamientos.module';
import { HistorialTratamiento } from './historial_tratamientos/historial_tratamiento.entity';
import { EstadoTratamientoModule } from './estado_tratamiento/estado_tratamiento.module';
import { EstadoTratamientoEntity } from './estado_tratamiento/estado_tratamiento.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin123',
      database: 'exampledb',
      entities: [
        Paciente,
        Tratamiento,
        HistorialTratamiento,
        EstadoTratamientoEntity,
      ],
      synchronize: true, //synchronize should be false in production for security
    }),
    PacienteModule,
    TratamientoModule,
    HistorialTratamientosModule,
    EstadoTratamientoModule,
  ],
})
export class AppModule {}
