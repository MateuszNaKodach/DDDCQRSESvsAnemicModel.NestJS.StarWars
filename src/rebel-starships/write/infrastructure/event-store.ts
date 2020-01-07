import {StoreDomainEventEntry} from './store-domain-event-entry';

export interface EventStore {

    store(event: StoreDomainEventEntry): Promise<void>;

    storeAll(events: StoreDomainEventEntry[]): Promise<void>;

    readEvents(aggregateId: string, toDate?: Date): Promise<StoreDomainEventEntry[]>;

}
