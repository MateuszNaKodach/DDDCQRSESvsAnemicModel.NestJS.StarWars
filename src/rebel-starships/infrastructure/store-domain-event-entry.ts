export interface StoreDomainEventEntry {
    readonly eventId: string;
    readonly eventType: string;
    readonly aggregateId: string;
    readonly occurredAt: Date;
    readonly payload: any;
}
