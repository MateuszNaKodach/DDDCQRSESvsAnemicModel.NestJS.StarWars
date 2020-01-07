import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {StarshipDomainEvent} from '../domain/starship.domain-events';

export namespace StarshipEventHandler {

    @EventsHandler(StarshipSentToBattle)
    export class StarshipSentToBattle implements IEventHandler<StarshipDomainEvent.StarshipSentToBattle> {

        handle(event: StarshipDomainEvent.StarshipSentToBattle): any {
            // tslint:disable-next-line:no-console
            console.log('sent to battle', event);
        }

    }

    export const All = [StarshipSentToBattle];

}
