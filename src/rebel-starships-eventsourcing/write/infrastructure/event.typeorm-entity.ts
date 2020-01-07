import {
    Entity,
    Column, PrimaryColumn, Index,
} from 'typeorm';
import {StoreDomainEventEntry} from './store-domain-event-entry';

@Entity({name: 'domain_events', orderBy: {occurredAt: 'ASC'}})
@Index(['aggregateId', 'order'], {unique: true})
export class DomainEventEntity implements StoreDomainEventEntry {
    @PrimaryColumn()
    readonly eventId: string;

    @Column()
    readonly eventType: string;

    @Column({type: 'timestamp'})
    readonly occurredAt: Date;

    @Column()
    readonly aggregateId: string;

    @Column()
    readonly order: number;

    @Column({type: 'json'})
    readonly payload: any;

    constructor(props: { eventId: string, eventType: string, occurredAt: Date, aggregateId: string, order: number, payload: any }) {
        this.eventId = props.eventId;
        this.eventType = props.eventType;
        this.occurredAt = props.occurredAt;
        this.aggregateId = props.aggregateId;
        this.order = props.order;
        this.payload = props.payload;
    }
}
