import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import database from '../config/database';
import {TypeOrmModule} from '@nestjs/typeorm';
import modules from '../config/modules';
import {StarWarsEventSourcingModule} from './star-wars-event-sourcing/star-wars-event-sourcing.module';
import {StarWarsAnemicModule} from './star-wars-anemic/star-wars-anemic.module';

//Jak użyć config service tutaj: https://docs.nestjs.com/techniques/database  Async

const typeOrmModule = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5002,
    username: process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME : 'postgres',
    password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : 'postgres',
    database: 'eventsourcing_star_wars',
    entities: [__dirname + '/**/*.typeorm-entity{.ts,.js}'],
    synchronize: true,
});

const modulesToImport = [
    ConfigModule.forRoot({
        load: [modules, database],
    }),
    StarWarsEventSourcingModule,
];

if ('typeorm' === process.env.DATABASE_MODE) {
    modulesToImport.push(typeOrmModule);
}

@Module({
    imports: [
        ...modulesToImport,
    ],
    controllers: [],
    providers: [],
    exports: [...modulesToImport],
})
export class AppModule {
}
