import {Module} from '@nestjs/common';
import {StarshipsController} from './presentation/rest/starships.controller';
import {CqrsModule} from '@nestjs/cqrs';
import {SendStarshipToBattleCommandHandler} from './application/send-starship-to-battle.command-handler';
import {StarshipSentToBattleEventHandler} from './application/starship-sent-to-battle.event-handler';
import {DateTimeProvider, TimeProvider} from '../nest-time-provider/time.provider';
import {EventSourcedStarshipRepository} from './infrastructure/event-sourced-starship-repository';
import {AttackStarshipCommandHandler} from './application/attack-starship.command-handler';
import {InMemoryEventStore} from './infrastructure/event-store.embedded';

const CommandHandlers = [SendStarshipToBattleCommandHandler, AttackStarshipCommandHandler];
const EventHandlers = [StarshipSentToBattleEventHandler];

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
        ...CommandHandlers,
        ...EventHandlers,
    ],
})
export class RebelStarshipsModule {
}
