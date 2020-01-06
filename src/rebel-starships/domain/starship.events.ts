import {StarshipId} from './starship-id.valueobject';
import {Fraction} from './fraction.enum';
import {DomainEventId} from '../../nest-event-sourcing/domain-event-id.valueobject';
import {AbstractDomainEvent} from '../../nest-event-sourcing/abstract-domain-event';

export namespace StarshipEvents {

    export class StarshipSentToBattle extends AbstractDomainEvent<StarshipId, { fraction: Fraction }> {
        static newFrom(aggregateId: StarshipId, occurredAt: Date, payload: { fraction: Fraction }) {
            return new StarshipSentToBattle(
                DomainEventId.generate(),
                occurredAt,
                aggregateId,
                payload,
            );
        }
    }

}
