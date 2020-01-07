import {Fraction} from '../write/domain/fraction.enum';

export class FleetState {
    fraction: Fraction;
    starshipsInBattle: number;
    destroyedStarships: number;
    attacked: number;
}
