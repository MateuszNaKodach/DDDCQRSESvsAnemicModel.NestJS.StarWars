import {AggregateId} from './aggregate-id.valueobject';
import {DomainEventId} from './domain-event-id.valueobject';
import {IEvent} from '@nestjs/cqrs';

export interface DomainEvent<I extends AggregateId = AggregateId, T = any> extends IEvent {
    readonly eventId: DomainEventId;
    readonly occurredAt: Date;
    readonly eventType: string;
    readonly aggregateId: I;
    readonly aggregateType: string;
    readonly payload: T;
}
