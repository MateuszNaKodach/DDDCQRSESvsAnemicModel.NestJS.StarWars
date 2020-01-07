import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {StarshipDomainEvent} from '../write/domain/starship.domain-events';
import {Inject} from '@nestjs/common';
import {FleetStateRepository} from './fleet-state.repository';
import {Fraction} from '../write/domain/fraction.enum';
import {FleetState} from './fleet-state.read-model';

export namespace FleetStateProjection {

    @EventsHandler(StarshipDomainEvent.StarshipSentToBattle)
    export class StarshipSentToBattle implements IEventHandler<StarshipDomainEvent.StarshipSentToBattle> {

        constructor(@Inject('FleetStateRepository') private fleetStateRepository: FleetStateRepository) {
        }

        async handle(event: StarshipDomainEvent.StarshipSentToBattle) {
            return eventProjection(this.fleetStateRepository, event.payload.fraction, state => ({
                ...state,
                starshipsInBattle: state.starshipsInBattle++,
            }));
        }

    }

    @EventsHandler(StarshipDomainEvent.StarshipDestroyed)
    export class StarshipDestroyed implements IEventHandler<StarshipDomainEvent.StarshipDestroyed> {

        constructor(@Inject('FleetStateRepository') private fleetStateRepository: FleetStateRepository) {
        }

        async handle(event: StarshipDomainEvent.StarshipDestroyed) {
            return eventProjection(this.fleetStateRepository, event.payload.fraction, state => ({
                ...state,
                starshipsInBattle: state.starshipsInBattle--,
                destroyedStarships: state.destroyedStarships++,
            }));
        }

    }

    const eventProjection = async (repository: FleetStateRepository, fraction: Fraction, projection: (state: FleetState) => void): Promise<void> => {
        const fleetState = await repository.findBy(fraction)
            .then(found => found ? found : {fraction, starshipsInBattle: 0, destroyedStarships: 0});
        projection(fleetState);
        return repository.save(fleetState);
    };

    export const All = [StarshipSentToBattle, StarshipDestroyed];

}
