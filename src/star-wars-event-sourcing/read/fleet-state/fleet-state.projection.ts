import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {StarshipDomainEvent} from '../../write/starship/domain/starship.domain-events';
import {Inject} from '@nestjs/common';
import {FleetStateRepository} from './fleet-state.repository';
import {Fraction} from '../../write/sharedkernel/domain/fraction.enum';
import {FleetState} from './fleet-state.read-model';

export namespace FleetStateProjection {

    @EventsHandler(StarshipDomainEvent.StarshipPrepared)
    export class StarshipPrepared implements IEventHandler<StarshipDomainEvent.StarshipPrepared> {

        constructor(@Inject('FleetStateRepository') private fleetStateRepository: FleetStateRepository) {
        }

        async handle(event: StarshipDomainEvent.StarshipPrepared) {
            return eventProjection(this.fleetStateRepository, event.payload.fraction, state => ({
                ...state,
                preparedStarships: state.preparedStarships++,
                starshipsWithoutCrew: state.starshipsWithoutCrew++,
            }));
        }

    }

    @EventsHandler(StarshipDomainEvent.SoldiersAddedToStarshipCrew)
    export class SoldiersAddedToStarshipCrew implements IEventHandler<StarshipDomainEvent.SoldiersAddedToStarshipCrew> {

        constructor(@Inject('FleetStateRepository') private fleetStateRepository: FleetStateRepository) {
        }

        async handle(event: StarshipDomainEvent.SoldiersAddedToStarshipCrew) {
            return eventProjection(this.fleetStateRepository, event.payload.fraction, state => ({
                ...state,
                starshipsWithoutCrew: state.starshipsWithoutCrew--,
            }));
        }

    }

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

    @EventsHandler(StarshipDomainEvent.StarshipAttacked)
    export class StarshipAttacked implements IEventHandler<StarshipDomainEvent.StarshipAttacked> {

        constructor(@Inject('FleetStateRepository') private fleetStateRepository: FleetStateRepository) {
        }

        async handle(event: StarshipDomainEvent.StarshipAttacked) {
            return eventProjection(this.fleetStateRepository, event.payload.fraction, state => ({
                ...state,
                attacked: state.attacked++,
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
                attacked: state.attacked++,
            }));
        }

    }

    const eventProjection = async (repository: FleetStateRepository, fraction: Fraction, projection: (state: FleetState) => void): Promise<void> => {
        const fleetState = await repository.findBy(fraction)
            .then(found => found ? found : {
                fraction,
                starshipsInBattle: 0,
                destroyedStarships: 0,
                attacked: 0,
                starshipsWithoutCrew: 0,
                preparedStarships: 0,
            });
        projection(fleetState);
        return repository.save(fleetState);
    };

    export const All = [StarshipPrepared, SoldiersAddedToStarshipCrew, StarshipSentToBattle, StarshipDestroyed];

}
