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
import {Army} from '../domain/army.aggregate-root';
import {ArmyDomainEvent} from '../domain/army.domain-events';
import {ArmyId} from '../domain/army-id.valueobject';

@Injectable()
export class EventSourcedArmyRepository extends EventSourcedAggregateRootRepository<Army, Army['id']> {

    constructor(@Inject('TimeProvider') timeProvider: TimeProvider,
                @Inject('EventStore')  eventStore: EventStore,
                eventPublisher: EventPublisher,
    ) {
        super(timeProvider, eventStore, eventPublisher);
    }

    protected newAggregate(): Army {
        return new Army(this.timeProvider);
    }

    protected recreateEventFromStored(event: StoreDomainEventEntry): DomainEvent {
        try {
            return new ArmyDomainEvent[event.eventType]
            (DomainEventId.of(event.eventId), event.occurredAt, ArmyId.of(event.aggregateId), event.payload);
        } catch (error) {
            throw new Error('UNHANDLED_EVENT_RECONSTRUCTION');
        }
    }

}
