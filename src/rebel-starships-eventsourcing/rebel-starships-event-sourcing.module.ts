import {Module, OnModuleInit} from '@nestjs/common';
import {StarshipsController} from './write/presentation/rest/starships.controller';
import {CommandBus, CqrsModule} from '@nestjs/cqrs';
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
import {StarshipRepository} from './write/domain/starship.repository';
import {ArmyRepository} from './write/domain/army.repository';
import {EventSourcedArmyRepository} from './write/infrastructure/event-sourced-army-repository';
import {ArmyCommandHandler} from './write/application/army.command-handlers';
import {ArmyCommand} from './write/application/army.commands';
import {ArmyId} from './write/domain/army-id.valueobject';
import {Fraction} from './write/domain/fraction.enum';
import {StarshipCommand} from './write/application/starship.commands';
import PrepareNewStarship = StarshipCommand.PrepareNewStarship;
import {StarshipId} from './write/domain/starship-id.valueobject';
import OrdersSoldiersToStarshipTransfer = ArmyCommand.OrderSoldiersToStarshipTransfer;
import {SoldiersTransferSaga} from './write/application/soldiers-transfer.saga';
import {ArmyController} from './write/presentation/rest/army.controller';
import {TypeOrmEventStore} from './write/infrastructure/event-store.typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DomainEventEntity} from './write/infrastructure/event.typeorm-entity';
import {Type} from '@nestjs/common/interfaces/type.interface';
import {DynamicModule} from '@nestjs/common/interfaces/modules/dynamic-module.interface';
import {ForwardReference} from '@nestjs/common/interfaces/modules/forward-reference.interface';

const modules: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference> = [CqrsModule];
if ('typeorm' === process.env.DATABASE_MODE) {
    modules.push(TypeOrmModule.forFeature([DomainEventEntity]));
}

@Module({
    imports: [...modules],
    controllers: [StarshipsController, FleetStateController, ArmyController],
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
            useClass: 'typeorm' === process.env.DATABASE_MODE ? TypeOrmEventStore : InMemoryEventStore,
        },
        {
            provide: 'EmailSender',
            useClass: OnlyLogEmailSender,
        },
        {
            provide: 'FleetStateRepository',
            useClass: InMemoryFleetStateRepository,
        },
        {
            provide: 'ArmyRepository',
            useClass: EventSourcedArmyRepository,
        },
        ...StarshipCommandHandler.All,
        ...StarshipEventHandler.All,
        ...FleetStateProjection.All,
        ...ArmyCommandHandler.All,
        AttackStarshipCapturedByEmpireSaga,
        SoldiersTransferSaga,
    ],
})
export class RebelStarshipsEventSourcingModule implements OnModuleInit {

    constructor(private readonly commandBus: CommandBus) {
    }

    async onModuleInit() {
        const rebellionArmyId = ArmyId.of(Fraction.REBELLION);
        await this.commandBus.execute(new ArmyCommand.RecruitSoldiers(rebellionArmyId, Fraction.REBELLION, 100));
        const starshipId1 = StarshipId.of('Starship1');
        await this.commandBus.execute(new PrepareNewStarship(starshipId1, Fraction.REBELLION));
        await this.commandBus.execute(new OrdersSoldiersToStarshipTransfer(rebellionArmyId, 20, starshipId1));
        const starshipId2 = StarshipId.of('Starship2');
        await this.commandBus.execute(new PrepareNewStarship(starshipId2, Fraction.REBELLION));
    }

}
