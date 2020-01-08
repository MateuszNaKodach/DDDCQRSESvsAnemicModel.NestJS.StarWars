import {StarshipId} from './starship-id.valueobject';
import {Fraction} from './fraction.enum';
import {DomainEventId} from './domain-event-id.valueobject';
import {AbstractDomainEvent} from './abstract-domain-event';
import {Condition} from './condition.valueobject';
import {Soldier} from './soldier.entity';

export namespace StarshipDomainEvent {

    abstract class AbstractStarshipDomainEvent<P = any> extends AbstractDomainEvent<StarshipId, P> {
    }

    export class StarshipPrepared extends AbstractStarshipDomainEvent<{ fraction: Fraction }> {
        static newFrom(aggregateId: StarshipId, occurredAt: Date, payload: { fraction: Fraction }) {
            return new StarshipPrepared(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

    export class StarshipSentToBattle extends AbstractStarshipDomainEvent<{ fraction: Fraction }> {
        static newFrom(aggregateId: StarshipId, occurredAt: Date, payload: { fraction: Fraction }) {
            return new StarshipSentToBattle(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

    export class StarshipAttacked extends AbstractStarshipDomainEvent<{ fraction: Fraction, power: Condition }> {
        static newFrom(aggregateId: StarshipId, occurredAt: Date, payload: { fraction: Fraction, power: Condition }) {
            return new StarshipAttacked(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

    export class StarshipDestroyed extends AbstractStarshipDomainEvent<{ fraction: Fraction }> {
        static newFrom(aggregateId: StarshipId, occurredAt: Date, payload: { fraction: Fraction }) {
            return new StarshipDestroyed(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

    export class StarshipRepaired
        extends AbstractStarshipDomainEvent<{ fraction: Fraction, repaired: Condition }> {
        static newFrom(
            aggregateId: StarshipId,
            occurredAt: Date,
            payload: { fraction: Fraction, repaired: Condition }) {
            return new StarshipRepaired(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

    export class StarshipCaptured extends AbstractStarshipDomainEvent<{ from: Fraction, by: Fraction, with: Condition }> {
        static newFrom(
            aggregateId: StarshipId,
            occurredAt: Date,
            payload: { from: Fraction, by: Fraction, with: Condition },
        ) {
            return new StarshipCaptured(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

    export class SoldiersAddedToStarshipCrew extends AbstractStarshipDomainEvent<{ fraction: Fraction, soldiers: Soldier[] }> {
        static newFrom(
            aggregateId: StarshipId,
            occurredAt: Date,
            payload: { fraction: Fraction, soldiers: Soldier[] },
        ) {
            return new SoldiersAddedToStarshipCrew(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

    export class SoldiersSentBackToArmy extends AbstractStarshipDomainEvent<{ fraction: Fraction, soldiers: Soldier[] }> {
        static newFrom(
            aggregateId: StarshipId,
            occurredAt: Date,
            payload: { fraction: Fraction, soldiers: Soldier[] },
        ) {
            return new SoldiersSentBackToArmy(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

}
