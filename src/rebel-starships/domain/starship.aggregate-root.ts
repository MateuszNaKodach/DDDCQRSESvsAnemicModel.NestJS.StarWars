import {AggregateRoot} from '@nestjs/cqrs';
import {StarshipId} from './starship-id.valueobject';
import {Fraction} from './fraction.enum';
import {Condition} from './condition.valueobject';

export class Starship extends AggregateRoot {

    private readonly id: StarshipId;
    private readonly fraction: Fraction;
    private readonly condition: Condition;

}
