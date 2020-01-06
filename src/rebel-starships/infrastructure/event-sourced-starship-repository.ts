import {EventPublisher} from '@nestjs/cqrs';
import {EventStore} from './event-store';
import {StarshipRepository} from '../domain/starship.repository';
import {StarshipId} from '../domain/starship-id.valueobject';
import {Starship} from '../domain/starship.aggregate-root';
import {DomainEvent} from '../../nest-event-sourcing/domain-event';
import {StarshipEvents} from '../domain/starship.events';
import {TimeProvider} from '../../nest-time-provider/time.provider';
import {Inject, Injectable} from '@nestjs/common';
import {StoreDomainEventEntry} from './store-domain-event-entry';
import {DomainEventId} from '../../nest-event-sourcing/domain-event-id.valueobject';

@Injectable()
export class EventSourcedStarshipRepository implements StarshipRepository {

    constructor(
        @Inject('TimeProvider') private readonly timeProvider: TimeProvider,
        @Inject('EventStore') private readonly eventStore: EventStore,
        private readonly eventPublisher: EventPublisher,
    ) {
    }

    async findById(id: StarshipId): Promise<Starship> {
        const events = await this.eventStore.readEvents(id.raw);
        const starship = new Starship(this.timeProvider);
        starship.loadFromHistory(events.map(EventSourcedStarshipRepository.recreateEventFromStored));
        return Promise.resolve(starship);
    }

    private static recreateEventFromStored(event: StoreDomainEventEntry) {
        try {
            return new StarshipEvents[event.eventType]
            (DomainEventId.of(event.eventId), event.occurredAt, StarshipId.of(event.aggregateId), event.payload);
        } catch (error) {
            throw new Error('UNHANDLED_EVENT_RECONSTRUCTION');
        }
    }

    save(starship: Starship): Promise<void> {
        const uncommitedEvents = starship.getUncommittedEvents()
            .map(it => EventSourcedStarshipRepository.toStoreDomainEventEntry(it as DomainEvent));
        return this.eventStore.storeAll(uncommitedEvents)
            .then(() => this.eventPublisher.mergeObjectContext(starship).commit());
    }

    private static toStoreDomainEventEntry(event: DomainEvent): StoreDomainEventEntry {
        return {
            eventId: event.eventId.raw,
            aggregateId: event.aggregateId.raw,
            occurredAt: event.occurredAt,
            eventType: event.eventType,
            payload: event.payload,
        };
    }

}
