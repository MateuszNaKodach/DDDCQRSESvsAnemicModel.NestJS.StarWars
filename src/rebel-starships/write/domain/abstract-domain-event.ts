import {DomainEvent} from './domain-event';
import {DomainEventId} from './domain-event-id.valueobject';
import {AggregateId} from './aggregate-id.valueobject';

export abstract class AbstractDomainEvent<I extends AggregateId = AggregateId, T = any> implements DomainEvent<I, T> {
    readonly eventId: DomainEventId;
    readonly occurredAt: Date;
    readonly aggregateId: I;
    readonly payload: T;

    constructor(eventId: DomainEventId, occurredAt: Date, aggregateId: I, payload: T) {
        this.eventId = eventId;
        this.occurredAt = occurredAt;
        this.aggregateId = aggregateId;
        this.payload = payload;
    }

    get eventType(): string {
        return Object.getPrototypeOf(this).constructor.name;
    }
}
