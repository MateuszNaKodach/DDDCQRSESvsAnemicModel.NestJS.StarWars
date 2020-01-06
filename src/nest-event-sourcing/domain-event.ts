import {AggregateId} from './aggregate-id.valueobject';
import {DomainEventId} from './domain-event-id.valueobject';
import {IEvent} from '@nestjs/cqrs';

export interface DomainEvent extends IEvent {
    readonly eventId: DomainEventId;
    readonly eventType: string;
    readonly aggregateId: AggregateId;
    readonly occurredAt: Date;
    readonly payload: any;
}
