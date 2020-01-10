import {EventPublisher} from '@nestjs/cqrs';
import {EventStore} from '../../../../event-store/event-store';
import {StarshipId} from '../../starship/domain/starship-id.valueobject';
import {Starship} from '../../starship/domain/starship.aggregate-root';
import {DomainEvent} from '../../sharedkernel/domain/domain-event';
import {TimeProvider} from '../../../../event-store/time.provider';
import {Inject, Injectable} from '@nestjs/common';
import {StoreDomainEventEntry} from '../../sharedkernel/infrastructure/store-domain-event-entry';
import {DomainEventId} from '../../sharedkernel/domain/domain-event-id.valueobject';
import {StarshipDomainEvent} from '../../starship/domain/starship.domain-events';
import {EventSourcedAggregateRootRepository} from '../../sharedkernel/infrastructure/event-sourced-aggregate-root.repository';
import {Army} from '../domain/army.aggregate-root';
import {ArmyDomainEvent} from '../domain/army.domain-events';
import {ArmyId} from '../../sharedkernel/domain/army-id.valueobject';

@Injectable()
export class EventSourcedArmyRepository extends EventSourcedAggregateRootRepository<Army, Army['id']> {

    constructor(@Inject() timeProvider: TimeProvider,
                @Inject()  eventStore: EventStore,
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
