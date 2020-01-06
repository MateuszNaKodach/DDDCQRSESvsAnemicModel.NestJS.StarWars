import {StarshipId} from './starship-id.valueobject';
import {Fraction} from './fraction.enum';
import {DomainEvent} from '../../nest-event-sourcing/domain-event';
import {DomainEventId} from '../../nest-event-sourcing/domain-event-id.valueobject';

export namespace StarshipEvents {

    export class StarshipSentToBattle implements DomainEvent {
        readonly eventId: DomainEventId;
        readonly eventType: string;
        readonly aggregateId: StarshipId;
        readonly occurredAt: Date;
        readonly payload: { fraction: Fraction };

        constructor(eventId: DomainEventId, aggregateId: StarshipId, occurredAt: Date, payload: { fraction: Fraction }, eventType?: string) {
            this.eventId = DomainEventId.generate();
            this.eventType = Object.getPrototypeOf(this).constructor.name;
            this.aggregateId = aggregateId;
            this.payload = payload;
            this.occurredAt = occurredAt;
        }

        static of(aggregateId: StarshipId, occurredAt: Date, payload: { fraction: Fraction }) {
            return new StarshipSentToBattle(
                DomainEventId.generate(),
                aggregateId,
                occurredAt,
                payload,
            );
        }

    }

}
