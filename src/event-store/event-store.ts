import {StoreDomainEventEntry} from '../star-wars-event-sourcing/write/sharedkernel/infrastructure/store-domain-event-entry';
import {EventStreamVersion} from './event-stream-version.valueobject';

export abstract class EventStore {

    abstract store(event: StoreDomainEventEntry, expectedVersion?: EventStreamVersion): Promise<void>;

    abstract storeAll(events: StoreDomainEventEntry[], expectedVersion?: EventStreamVersion): Promise<void>;

    abstract readEvents(aggregateId: string, toDate?: Date): Promise<StoreDomainEventEntry[]>;

}
