import {Module} from '@nestjs/common';
import {StarshipsController} from './presentation/rest/starships.controller';
import {CqrsModule} from '@nestjs/cqrs';
import {EventSourcedStarshipRepository} from './infrastructure/event-sourced-starship-repository';
import {InMemoryEventStore} from './infrastructure/event-store.embedded';
import {DateTimeProvider} from './infrastructure/date-time.provider';
import {StarshipCommandHandler} from './application/starship.command-handlers';
import {StarshipEventHandler} from './application/starship.event-handlers';

@Module({
    imports: [CqrsModule],
    controllers: [StarshipsController],
    providers: [
        {
            provide: 'TimeProvider',
            useClass: DateTimeProvider,
        },
        {
            provide: 'StarshipRepository',
            useClass: EventSourcedStarshipRepository,
        },
        {
            provide: 'EventStore',
            useClass: InMemoryEventStore,
        },
        ...StarshipCommandHandler.All,
        ...StarshipEventHandler.All,
    ],
})
export class RebelStarshipsModule {
}
