import {Fraction} from '../../write/sharedkernel/domain/fraction.enum';

export class FleetState {
    fraction: Fraction;
    preparedStarships: number;
    starshipsWithoutCrew: number;
    starshipsInBattle: number;
    destroyedStarships: number;
    attacked: number;
}
