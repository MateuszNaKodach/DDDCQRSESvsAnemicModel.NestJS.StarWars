import {Fraction} from '../write/domain/fraction.enum';

export class FleetState {
    fraction: Fraction;
    preparedStarships: number;
    starshipsWithoutCrew: number;
    starshipsInBattle: number;
    destroyedStarships: number;
    attacked: number;
}
