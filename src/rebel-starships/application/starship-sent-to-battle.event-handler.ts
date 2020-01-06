import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {StarshipEvents} from '../domain/starship.events';
import StarshipSentToBattle = StarshipEvents.StarshipSentToBattle;

@EventsHandler(StarshipSentToBattle)
export class StarshipSentToBattleEventHandler implements IEventHandler<StarshipSentToBattle> {

    handle(event: StarshipSentToBattle): any {
        // tslint:disable-next-line:no-console
        console.log('sent to battle', event);
    }

}
