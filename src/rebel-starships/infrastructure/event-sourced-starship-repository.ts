import {EventPublisher} from '@nestjs/cqrs';
import {EventStore} from './event-store';
import {StarshipRepository} from '../domain/starship.repository';
import {StarshipId} from '../domain/starship-id.valueobject';
import {Starship} from '../domain/starship.aggregate-root';
import {DomainEvent} from '../../nest-event-sourcing/domain-event';
import {StarshipEvents} from '../domain/starship.events';
import {TimeProvider} from '../../nest-time-provider/time.provider';
import {Inject, Injectable} from '@nestjs/common';

@Injectable()
export class EventSourcedStarshipRepository implements StarshipRepository {

    constructor(
        @Inject('TimeProvider') private readonly timeProvider: TimeProvider,
        @Inject('EventStore') private readonly eventStore: EventStore,
        private readonly eventPublisher: EventPublisher,
    ) {
    }

    async findById(id: StarshipId): Promise<Starship> {
        const events = await this.eventStore.readEvents(id);
        const starship = new Starship(this.timeProvider);
        starship.loadFromHistory(events.map(EventSourcedStarshipRepository.recreateEvent));
        return Promise.resolve(starship);
    }

    private static recreateEvent(event: DomainEvent) {
        try {
            console.log(event);
            return new (StarshipEvents as any)[event.eventType](event.eventId, event.aggregateId, event.occurredAt, event.payload, event.eventType);
        } catch (error) {
            console.log(error);
            throw new Error('UNHANDLED_EVENT_RECONSTRUCTION');
        }
    }

    save(starship: Starship): Promise<void> {
        const uncommitedEvents = starship.getUncommittedEvents().map(it => it as DomainEvent);
        return this.eventStore.storeAll(uncommitedEvents)
            .then(() => this.eventPublisher.mergeObjectContext(starship).commit());
    }

}
