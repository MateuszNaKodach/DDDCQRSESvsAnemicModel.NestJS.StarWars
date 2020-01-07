import {Fraction} from './fraction.enum';
import {Soldier} from './soldier.entity';
import {AggregateRoot} from '@nestjs/cqrs';
import {TimeProvider} from '../application/time.provider';
import {StarshipId} from './starship-id.valueobject';
import {ArmyDomainEvent} from './army.domain-events';
import SoldiersRecruited = ArmyDomainEvent.SoldiersRecruited;
import {ArmyId} from './army-id.valueobject';
import SoldiersTransferToStarshipOrdered = ArmyDomainEvent.SoldiersTransferToStarshipOrdered;

export class Army extends AggregateRoot {
    private id: ArmyId;
    private fraction: Fraction;
    private soldiers: Soldier[];
    private timeProvider: TimeProvider;

    constructor(timeProvider: TimeProvider) {
        super();
        this.timeProvider = timeProvider;
    }

    recruitSoldiers(armyId: ArmyId, fraction: Fraction, soldiersCount: number) {
        const soldiers = [...Array(soldiersCount).keys()].map(() => Soldier.recruit());
        this.apply(SoldiersRecruited.newFrom(armyId, this.timeProvider.currentDate(), {fraction, soldiers}));
    }

    orderSoldiersToStarshipTransfer(soldiersCount: number, starshipId: StarshipId) {
        if (this.soldiers.length < soldiersCount) {
            throw new Error('No sufficient count of soldiers to transfer to starship!');
        }
        const soldiersToTransfer = this.soldiers.slice(0, soldiersCount);
        this.apply(SoldiersTransferToStarshipOrdered.newFrom(this.id, this.timeProvider.currentDate(), {starshipId, soldiers: soldiersToTransfer}));
    }

    onSoldiersRecruited(event: SoldiersRecruited) {
        this.id = event.aggregateId;
        this.fraction = event.payload.fraction;
        this.soldiers = event.payload.soldiers;
    }

    onSoldiersTransferToStarshipOrdered(event: SoldiersTransferToStarshipOrdered) {
        this.id = event.aggregateId;
        this.soldiers = event.payload.soldiers.slice(0, event.payload.soldiers.length);
    }

}
