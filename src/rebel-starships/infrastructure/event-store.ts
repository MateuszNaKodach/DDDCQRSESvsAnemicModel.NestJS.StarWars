import {DomainEvent} from '../../nest-event-sourcing/domain-event';
import {AggregateId} from '../../nest-event-sourcing/aggregate-id.valueobject';

export interface EventBus {
    publishAll(events: DomainEvent[]);

    publish(event: DomainEvent);
}

export interface EventStore extends EventBus {

    readEvents(aggregateId: AggregateId, toDate?: Date);

}
