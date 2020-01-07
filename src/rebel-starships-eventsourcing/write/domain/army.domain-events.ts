import {StarshipId} from './starship-id.valueobject';
import {DomainEventId} from './domain-event-id.valueobject';
import {AbstractDomainEvent} from './abstract-domain-event';
import {ArmyId} from './army-id.valueobject';
import {Fraction} from './fraction.enum';
import {Soldier} from './soldier.entity';

export namespace ArmyDomainEvent {

    abstract class AbstractArmyDomainEvent<P = any> extends AbstractDomainEvent<ArmyId, P> {
    }

    export class SoldiersRecruited extends AbstractArmyDomainEvent<{ fraction: Fraction, soldiers: Soldier[] }> {
        static newFrom(aggregateId: StarshipId, occurredAt: Date, payload: { fraction: Fraction, soldiers: Soldier[]  }) {
            return new SoldiersRecruited(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

    export class SoldiersTransferToStarshipOrdered extends AbstractArmyDomainEvent<{ starshipId: StarshipId, soldiers: Soldier[]  }> {
        static newFrom(aggregateId: StarshipId, occurredAt: Date, payload: { starshipId: StarshipId, soldiers: Soldier[]  }) {
            return new SoldiersTransferToStarshipOrdered(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

}
