import {Module} from '@nestjs/common';
import {StarshipsController} from './write/presentation/rest/starships.controller';
import {CqrsModule} from '@nestjs/cqrs';
import {EventSourcedStarshipRepository} from './write/infrastructure/event-sourced-starship-repository';
import {InMemoryEventStore} from './write/infrastructure/event-store.embedded';
import {DateTimeProvider} from './write/infrastructure/date-time.provider';
import {StarshipCommandHandler} from './write/application/starship.command-handlers';
import {StarshipEventHandler} from './write/application/starship.event-handlers';
import {OnlyLogEmailSender} from './write/infrastructure/only-log-email-sender.adapter';
import {FleetStateController} from './read/fleet-state.controller';
import {InMemoryFleetStateRepository} from './read/infrastructure/in-memory-fleet-state.repository';
import {FleetStateProjection} from './read/fleet-state.projection';
import {AttackStarshipCapturedByEmpireSaga} from './write/application/starship.saga';

@Module({
    imports: [CqrsModule],
    controllers: [StarshipsController, FleetStateController],
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
        {
            provide: 'EmailSender',
            useClass: OnlyLogEmailSender,
        },
        {
            provide: 'FleetStateRepository',
            useClass: InMemoryFleetStateRepository,
        },
        ...StarshipCommandHandler.All,
        ...StarshipEventHandler.All,
        ...FleetStateProjection.All,
        AttackStarshipCapturedByEmpireSaga,
    ],
})
export class RebelStarshipsModule {
}
