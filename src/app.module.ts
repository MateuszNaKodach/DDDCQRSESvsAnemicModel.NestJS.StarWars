import {Module} from '@nestjs/common';
import {RebelStarshipsEventSourcingModule} from './rebel-starships-eventsourcing/rebel-starships-event-sourcing.module';
import {RebelStarshipsAnemicModule} from './rebel-starships-anemic/rebel-starships-anemic.module';
import {ConfigModule} from '@nestjs/config';
import database from '../config/database';
import {TypeOrmModule} from '@nestjs/typeorm';

const typeOrmModule = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5002,
    username: process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME : 'postgres',
    password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : 'postgres',
    database: 'eventsourcing_star_wars',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
});

const modules = [
    ConfigModule.forRoot({
        load: [database],
    }),
    RebelStarshipsEventSourcingModule,
    RebelStarshipsAnemicModule,
];

if ('typeorm' === process.env.DATABASE_MODE) {
    modules.push(typeOrmModule);
}

@Module({
    imports: [
        ...modules,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
