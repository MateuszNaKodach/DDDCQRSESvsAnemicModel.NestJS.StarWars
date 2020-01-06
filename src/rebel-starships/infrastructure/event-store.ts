import {DomainEvent} from '../../nest-event-sourcing/domain-event';
import {AggregateId} from '../../nest-event-sourcing/aggregate-id.valueobject';

export interface EventStore {

    store(event: DomainEvent): Promise<void>;

    storeAll(events: DomainEvent[]): Promise<void>;

    readEvents(aggregateId: AggregateId, toDate?: Date): Promise<DomainEvent[]>;

}
