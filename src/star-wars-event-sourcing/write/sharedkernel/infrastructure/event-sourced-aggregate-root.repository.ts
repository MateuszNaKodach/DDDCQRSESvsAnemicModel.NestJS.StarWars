import {AggregateRoot, EventPublisher} from '@nestjs/cqrs';
import {EventStore} from './event-store';
import {StarshipRepository} from '../../starship/domain/starship.repository';
import {StarshipId} from '../../starship/domain/starship-id.valueobject';
import {Starship} from '../../starship/domain/starship.aggregate-root';
import {DomainEvent} from '../domain/domain-event';
import {TimeProvider} from '../application/time.provider';
import {Inject, Injectable} from '@nestjs/common';
import {StoreDomainEventEntry} from './store-domain-event-entry';
import {DomainEventId} from '../domain/domain-event-id.valueobject';
import {StarshipDomainEvent} from '../../starship/domain/starship.domain-events';
import {AggregateRootRepository} from '../domain/aggregate-root.repository';
import {AggregateId} from '../domain/aggregate-id.valueobject';

export abstract class EventSourcedAggregateRootRepository<T extends AggregateRoot, I extends AggregateId> implements AggregateRootRepository<T, I> {

    protected constructor(
        protected readonly timeProvider: TimeProvider,
        private readonly eventStore: EventStore,
        private readonly eventPublisher: EventPublisher,
    ) {
    }

    async findById(id: I): Promise<T | null> {
        const events = await this.eventStore.readEvents(id.raw);
        if (events.length === 0) {
            return Promise.resolve(null);
        }
        const aggregate = this.newAggregate();
        aggregate.loadFromHistory(events.map(this.recreateEventFromStored));
        return Promise.resolve(aggregate);
    }

    protected abstract newAggregate(): T;

    protected abstract recreateEventFromStored(event: StoreDomainEventEntry): DomainEvent;

    save(aggregate: T): Promise<void> {
        const uncommitedEvents = aggregate.getUncommittedEvents()
            .map(it => EventSourcedAggregateRootRepository.toStoreDomainEventEntry(it as DomainEvent));
        return this.eventStore.storeAll(uncommitedEvents)
            .then(() => this.eventPublisher.mergeObjectContext(aggregate).commit());
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
