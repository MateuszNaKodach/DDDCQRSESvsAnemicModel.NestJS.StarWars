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

    constructor(eventId: string, eventType: string, occurredAt: Date, aggregateId: string, order: number, payload: any) {
        this.eventId = eventId;
        this.eventType = eventType;
        this.occurredAt = occurredAt;
        this.aggregateId = aggregateId;
        this.order = order;
        this.payload = payload;
    }

    static fromProps(props: { eventId: string, eventType: string, occurredAt: Date, aggregateId: string, order: number, payload: any }) {
        return new DomainEventEntity(
            props.eventId,
            props.eventType,
            props.occurredAt,
            props.aggregateId,
            props.order,
            props.payload
        );
    }
}
