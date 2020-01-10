import {Module} from '@nestjs/common';
import {EventStore} from './event-store';
import {TypeOrmEventStore} from './event-store.typeorm';
import {InMemoryEventStore} from './event-store.embedded';
import {TimeProvider} from './time.provider';
import {SystemTimeProvider} from './system-time-provider.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DomainEventEntity} from '../star-wars-event-sourcing/write/sharedkernel/infrastructure/event.typeorm-entity';

const optionalImports = [];
if ('typeorm' === process.env.DATABASE_MODE) {
    optionalImports.push(TypeOrmModule.forFeature([DomainEventEntity]));
}

@Module({
    imports: [...optionalImports],
    controllers: [],
    providers: [
        {
            provide: TimeProvider,
            useClass: SystemTimeProvider,
        },
        {
            provide: EventStore,
            useClass: 'typeorm' === process.env.DATABASE_MODE ? TypeOrmEventStore : InMemoryEventStore,
        },
    ],
    exports: [
        EventStore,
        TimeProvider,
    ],
})
export class EventStoreModule {
}
