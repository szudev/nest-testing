import { DataSource } from 'typeorm';
import { Paciente } from './paciente/paciente.entity';
import { HistorialTratamiento } from './historial_tratamientos/historial_tratamiento.entity';
import { Tratamiento } from './tratamiento/tratamiento.entity';
import { EstadoTratamientoEntity } from './estado_tratamiento/estado_tratamiento.entity';

export const AppDataSource = new DataSource({
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
  migrations: ['dist/migrations/*.js'], // Ajusta esta ruta según tu estructura
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
