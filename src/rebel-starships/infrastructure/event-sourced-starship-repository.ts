import {EventPublisher} from '@nestjs/cqrs';

export class EventSourcedStarshipRepository {

    constructor(private readonly eventPublisher: EventPublisher) {
    }

}
