import {Entity} from 'typeorm';

@Entity()
export class Event {
    id: string;
    aggregateType: string;
    aggregateId: string;
    occurredAt: Date;
    payloadType: string;
    payload?: any;
    metadata?: any;
}
