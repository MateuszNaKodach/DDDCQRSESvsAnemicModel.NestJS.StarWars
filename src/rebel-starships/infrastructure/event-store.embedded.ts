import {EventStore} from './event-store';
import {TimeProvider} from '../../nest-time-provider/time.provider';
import {DomainEvent} from '../../nest-event-sourcing/domain-event';
import {AggregateId} from '../../nest-event-sourcing/aggregate-id.valueobject';
import * as moment from 'moment';
import {Inject, Injectable} from '@nestjs/common';

@Injectable()
export class InMemoryEventStore implements EventStore {

    private eventStreams: { [key: string]: DomainEvent[]; } = {};

    constructor(@Inject('TimeProvider') private readonly timeProvider: TimeProvider) {
    }

    store(event: DomainEvent): Promise<void> {
        const foundStream = this.eventStreams[event.aggregateId.raw];
        if (!foundStream) {
            this.eventStreams[event.aggregateId.raw] = [event];
        }
        return Promise.resolve();
    }

    storeAll(events: DomainEvent[]): Promise<void> {
        return Promise.all(events.map(it => this.store(it)))
            .then();
    }

    readEvents(aggregateId: AggregateId, toDate?: Date) {
        const maxEventDate = toDate ? toDate : this.timeProvider.currentDate();
        const events = this.getEventsBy(aggregateId)
            .filter(it => moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)));
        return Promise.resolve(events);
    }

    private getEventsBy(aggregateId: AggregateId): DomainEvent[] {
        const foundStream = this.eventStreams[aggregateId.raw];
        return foundStream ? foundStream : [];
    }

}
