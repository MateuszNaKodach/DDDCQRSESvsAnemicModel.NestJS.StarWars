export interface StoreDomainEventEntry {
    readonly eventId: string;
    readonly eventType: string;
    readonly occurredAt: Date;
    readonly aggregateId: string;
    readonly payload: any;
}
