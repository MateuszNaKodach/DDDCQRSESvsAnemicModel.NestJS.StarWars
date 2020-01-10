import {EventPublisher} from '@nestjs/cqrs';
import {EventStore} from '../../../../event-store/event-store';
import {StarshipId} from '../domain/starship-id.valueobject';
import {Starship} from '../domain/starship.aggregate-root';
import {DomainEvent} from '../../sharedkernel/domain/domain-event';
import {TimeProvider} from '../../../../event-store/time.provider';
import {Inject, Injectable} from '@nestjs/common';
import {StoreDomainEventEntry} from '../../sharedkernel/infrastructure/store-domain-event-entry';
import {DomainEventId} from '../../sharedkernel/domain/domain-event-id.valueobject';
import {StarshipDomainEvent} from '../domain/starship.domain-events';
import {EventSourcedAggregateRootRepository} from '../../sharedkernel/infrastructure/event-sourced-aggregate-root.repository';

@Injectable()
export class EventSourcedStarshipRepository extends EventSourcedAggregateRootRepository<Starship, Starship['id']> {

    constructor(@Inject() timeProvider: TimeProvider,
                @Inject()  eventStore: EventStore,
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
