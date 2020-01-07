import {
    Entity,
    Column, PrimaryColumn,
} from 'typeorm';
import {StoreDomainEventEntry} from './store-domain-event-entry';

@Entity()
export class DomainEventEntity implements StoreDomainEventEntry {
    @PrimaryColumn()
    readonly eventId: string;

    @Column()
    readonly eventType: string;

    @Column({type: 'timestamp'})
    readonly occurredAt: Date;

    @Column()
    readonly aggregateId: string;

    @Column({type: 'json'})
    readonly payload: any;

    constructor(props: {eventId: string, eventType: string, occurredAt: Date, aggregateId: string, payload: any}) {
        this.eventId = props.eventId;
        this.eventType = props.eventType;
        this.occurredAt = props.occurredAt;
        this.aggregateId = props.aggregateId;
        this.payload = props.payload;
    }
}
