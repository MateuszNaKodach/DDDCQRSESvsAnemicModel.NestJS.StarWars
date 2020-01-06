import {EventStore} from './event-store';
import {TimeProvider} from '../../nest-time-provider/time.provider';
import {EventBus, EventPublisher} from '@nestjs/cqrs';
import {DomainEvent} from '../../nest-event-sourcing/domain-event';
import {AggregateId} from '../../nest-event-sourcing/aggregate-id.valueobject';

export class EmbeddedEventStore implements EventStore {

    private eventStreams: { [key: string]: DomainEvent[]; } = {};

    constructor(private readonly timeProvider: TimeProvider, private readonly eventBus: EventBus) {
    }

    publish(event: DomainEvent) {
        const foundStream = this.eventStreams[event.aggregateId.raw];
        if (!foundStream) {
            this.eventStreams[event.aggregateId.raw] = [event];
        }
        this.eventBus.publish(event);
    }

    publishAll(events: DomainEvent[]) {
        events.forEach(it => this.publish(it));
    }

    readEvents(aggregateId: AggregateId, toDate?: Date) {

    }

    getEventsBy(aggregateId: AggregateId): DomainEvent[] {
        const foundStream = this.eventStreams[aggregateId.raw];
        return foundStream ? foundStream : [];
    }

}
