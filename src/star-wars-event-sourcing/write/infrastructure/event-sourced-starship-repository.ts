import {EventPublisher} from '@nestjs/cqrs';
import {EventStore} from './event-store';
import {StarshipId} from '../domain/starship-id.valueobject';
import {Starship} from '../domain/starship.aggregate-root';
import {DomainEvent} from '../domain/domain-event';
import {TimeProvider} from '../application/time.provider';
import {Inject, Injectable} from '@nestjs/common';
import {StoreDomainEventEntry} from './store-domain-event-entry';
import {DomainEventId} from '../domain/domain-event-id.valueobject';
import {StarshipDomainEvent} from '../domain/starship.domain-events';
import {EventSourcedAggregateRootRepository} from './event-sourced-aggregate-root.repository';

@Injectable()
export class EventSourcedStarshipRepository extends EventSourcedAggregateRootRepository<Starship, Starship['id']> {

    constructor(@Inject('TimeProvider') timeProvider: TimeProvider,
                @Inject('EventStore')  eventStore: EventStore,
                eventPublisher: EventPublisher,
    ) {
        super(timeProvider, eventStore, eventPublisher);
    }

    protected newAggregate(): Starship {
        return new Starship(this.timeProvider);
    }

    protected recreateEventFromStored(event: StoreDomainEventEntry): DomainEvent {
        try {
            return new StarshipDomainEvent[event.eventType]
            (DomainEventId.of(event.eventId), event.occurredAt, StarshipId.of(event.aggregateId), event.payload);
        } catch (error) {
            throw new Error('UNHANDLED_EVENT_RECONSTRUCTION');
        }
    }

}
