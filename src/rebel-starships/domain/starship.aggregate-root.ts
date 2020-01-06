import {AggregateRoot} from '@nestjs/cqrs';
import {StarshipId} from './starship-id.valueobject';
import {Fraction} from './fraction.enum';
import {Condition} from './condition.valueobject';
import {TimeProvider} from '../../nest-time-provider/time.provider';
import {StarshipEvents} from './starship.events';
import StarshipSentToBattle = StarshipEvents.StarshipSentToBattle;

export class Starship extends AggregateRoot {

    private id: StarshipId;
    private fraction: Fraction;
    private condition: Condition;
    private timeProvider: TimeProvider;

    constructor(timeProvider: TimeProvider) {
        super();
        this.timeProvider = timeProvider;
    }

    sendToBattle(id: StarshipId, fraction: Fraction) {
        this.apply(StarshipSentToBattle.of(id, this.timeProvider.currentDate(), {fraction}));
    }

    onStarshipSentToBattle(event: StarshipSentToBattle) {
        this.id = event.aggregateId;
        this.fraction = event.payload.fraction;
        this.condition = Condition.full();
    }
}
