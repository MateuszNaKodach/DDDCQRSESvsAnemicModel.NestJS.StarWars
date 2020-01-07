import {AggregateRoot} from '@nestjs/cqrs';
import {StarshipId} from './starship-id.valueobject';
import {Fraction} from './fraction.enum';
import {Condition} from './condition.valueobject';
import {TimeProvider} from '../application/time.provider';
import {StarshipDomainEvent} from './starship.domain-events';
import {Importance} from './importance.enum';
import StarshipSentToBattle = StarshipDomainEvent.StarshipSentToBattle;
import StarshipAttacked = StarshipDomainEvent.StarshipAttacked;
import StarshipRepaired = StarshipDomainEvent.StarshipRepaired;
import StarshipDestroyed = StarshipDomainEvent.StarshipDestroyed;
import StarshipCaptured = StarshipDomainEvent.StarshipCaptured;

export class Starship extends AggregateRoot {

    private id: StarshipId;
    private fraction: Fraction;
    private condition: Condition;
    private importance: Importance;
    private timeProvider: TimeProvider;

    constructor(timeProvider: TimeProvider) {
        super();
        this.timeProvider = timeProvider;
    }

    sendToBattle(id: StarshipId, fraction: Fraction, importance: Importance) {
        this.apply(StarshipSentToBattle.newFrom(id, this.timeProvider.currentDate(), {fraction, importance}));
    }

    attack(power: Condition) {
        if (this.fraction === Fraction.REBELLION) {
            throw new Error('Do not attack ally starship!');
        }
        if (this.condition.smallerOrEqualsTo(power)) {
            this.apply(
                StarshipAttacked.newFrom(this.id, this.timeProvider.currentDate(), {
                    fraction: this.fraction,
                    importance: this.importance,
                    power,
                }),
            );
        } else {
            this.apply(
                StarshipDestroyed.newFrom(this.id, this.timeProvider.currentDate(), {
                    fraction: this.fraction,
                    importance: this.importance,
                }),
            );
        }
    }

    repair(by: Condition) {
        if (this.fraction === Fraction.EMPIRE) {
            throw new Error('Do not repair enemy starship!');
        }
        this.apply(StarshipRepaired.newFrom(this.id, this.timeProvider.currentDate(), {fraction: this.fraction, repaired: by}));
    }

    capture(by: Fraction) {
        if (this.fraction === by) {
            throw new Error(`Starship already belongs to ${by}!`);
        }
        this.apply(
            StarshipCaptured.newFrom(this.id, this.timeProvider.currentDate(), {
                from: this.fraction,
                by: this.fraction,
                importance: this.importance,
            })
        );
    }

    onStarshipSentToBattle(event: StarshipSentToBattle) {
        this.id = event.aggregateId;
        this.fraction = event.payload.fraction;
        this.condition = Condition.full();
    }
}
