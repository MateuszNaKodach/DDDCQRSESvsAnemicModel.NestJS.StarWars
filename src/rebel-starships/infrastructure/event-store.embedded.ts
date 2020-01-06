import {EventStore} from './event-store';
import {TimeProvider} from '../../nest-time-provider/time.provider';
import * as moment from 'moment';
import {Inject, Injectable} from '@nestjs/common';
import {StoreDomainEventEntry} from './store-domain-event-entry';

@Injectable()
export class InMemoryEventStore implements EventStore {

    private eventStreams: { [key: string]: StoreDomainEventEntry[]; } = {};

    constructor(@Inject('TimeProvider') private readonly timeProvider: TimeProvider) {
    }

    store(event: StoreDomainEventEntry): Promise<void> {
        const foundStream = this.eventStreams[event.aggregateId];
        if (!foundStream) {
            this.eventStreams[event.aggregateId] = [event];
        }
        return Promise.resolve();
    }

    storeAll(events: StoreDomainEventEntry[]): Promise<void> {
        return Promise.all(events.map(it => this.store(it)))
            .then();
    }

    readEvents(aggregateId: string, toDate?: Date) {
        const maxEventDate = toDate ? toDate : this.timeProvider.currentDate();
        const events = this.getEventsBy(aggregateId)
            .filter(it => moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)));
        return Promise.resolve(events);
    }

    private getEventsBy(aggregateId: string): StoreDomainEventEntry[] {
        const foundStream = this.eventStreams[aggregateId];
        return foundStream ? foundStream : [];
    }

}
