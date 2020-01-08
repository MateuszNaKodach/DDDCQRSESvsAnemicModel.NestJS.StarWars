export interface StoreDomainEventEntry {
    readonly eventId: string;
    readonly eventType: string;
    readonly occurredAt: Date;
    readonly aggregateId: string;
    readonly aggregateType: string;
    readonly payload: any;
}
