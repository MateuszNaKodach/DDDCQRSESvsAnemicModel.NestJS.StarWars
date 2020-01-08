import {EventStore} from './event-store';
import {TimeProvider} from '../application/time.provider';
import * as moment from 'moment';
import {Inject, Injectable} from '@nestjs/common';
import {StoreDomainEventEntry} from './store-domain-event-entry';
import {EventStreamVersion} from './event-stream-version.valueobject';
import {InjectRepository} from '@nestjs/typeorm';
import {DomainEventEntity} from './event.typeorm-entity';
import {Repository} from 'typeorm';

@Injectable()
export class TypeOrmEventStore implements EventStore {

    constructor(
        @Inject('TimeProvider') private readonly timeProvider: TimeProvider,
        @InjectRepository(DomainEventEntity) private readonly typeOrmRepository: Repository<DomainEventEntity>) {
    }

    async store(event: StoreDomainEventEntry, expectedVersion?: EventStreamVersion): Promise<void> {
        const aggregateEvents = await this.typeOrmRepository.find({where: {aggregateId: event.aggregateId}});
        const nextEventOrder = aggregateEvents.length + 1;
        const typeOrmDomainEvent = DomainEventEntity.fromProps({...event, order: nextEventOrder});
        return this.typeOrmRepository.save(typeOrmDomainEvent).then();
    }

    //TODO: Check if events are from one stream!
    async storeAll(events: StoreDomainEventEntry[]): Promise<void> {
        const aggregateEvents = await this.typeOrmRepository.find({where: {aggregateId: events[0].aggregateId}});
        const nextEventOrder = aggregateEvents.length + 1;
        const typeOrmEvents = events.map((e, i) => DomainEventEntity.fromProps({...e, order: nextEventOrder + i}));
        return this.typeOrmRepository.save(typeOrmEvents).then();
    }

    readEvents(aggregateId: string, toDate?: Date) {
        const maxEventDate = toDate ? toDate : this.timeProvider.currentDate();
        return this.typeOrmRepository.find({where: {aggregateId}}) // TODO: Query with occurredAt
            .then(found => found.filter(it => moment(it.occurredAt).isSameOrBefore(moment(maxEventDate))));
    }

}
