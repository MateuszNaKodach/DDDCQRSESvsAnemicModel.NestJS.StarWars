import {StarshipId} from './starship-id.valueobject';
import {Fraction} from './fraction.enum';
import {DomainEventId} from './domain-event-id.valueobject';
import {AbstractDomainEvent} from './abstract-domain-event';
import {Importance} from './importance.enum';
import {Condition} from './condition.valueobject';

export namespace StarshipDomainEvent {

    abstract class AbstractStarshipDomainEvent<P = any> extends AbstractDomainEvent<StarshipId, P> {
    }

    export class StarshipSentToBattle extends AbstractStarshipDomainEvent<{ fraction: Fraction, importance: Importance }> {
        static newFrom(aggregateId: StarshipId, occurredAt: Date, payload: { fraction: Fraction, importance: Importance }) {
            return new StarshipSentToBattle(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

    export class StarshipAttacked extends AbstractStarshipDomainEvent<{ fraction: Fraction, importance: Importance, power: Condition }> {
        static newFrom(aggregateId: StarshipId, occurredAt: Date, payload: { fraction: Fraction, importance: Importance, power: Condition }) {
            return new StarshipAttacked(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

    export class StarshipDestroyed extends AbstractStarshipDomainEvent<{ fraction: Fraction, importance: Importance }> {
        static newFrom(aggregateId: StarshipId, occurredAt: Date, payload: { fraction: Fraction, importance: Importance }) {
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

    export class StarshipCaptured extends AbstractStarshipDomainEvent<{ from: Fraction, by: Fraction, importance: Importance, with: Condition }> {
        static newFrom(
            aggregateId: StarshipId,
            occurredAt: Date,
            payload: { from: Fraction, by: Fraction, importance: Importance, with: Condition },
        ) {
            return new StarshipCaptured(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

}
