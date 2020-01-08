import {StoreDomainEventEntry} from './store-domain-event-entry';
import {EventStreamVersion} from './event-stream-version.valueobject';

export interface EventStore {

    store(event: StoreDomainEventEntry, expectedVersion?: EventStreamVersion): Promise<void>;

    storeAll(events: StoreDomainEventEntry[], expectedVersion?: EventStreamVersion): Promise<void>;

    readEvents(aggregateId: string, toDate?: Date): Promise<StoreDomainEventEntry[]>;

}
