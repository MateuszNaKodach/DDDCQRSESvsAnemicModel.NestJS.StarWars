import {StarshipId} from '../domain/starship-id.valueobject';
import {Fraction} from '../domain/fraction.enum';

export class SendStarshipToBattleCommand {
    readonly id: StarshipId;
    readonly fraction: Fraction;

    constructor(payload: { readonly id: StarshipId, readonly  fraction: Fraction }) {
        this.id = payload.id;
        this.fraction = payload.fraction;
    }
}
