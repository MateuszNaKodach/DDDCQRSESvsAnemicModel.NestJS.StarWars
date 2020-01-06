import {StarshipId} from '../domain/starship-id.valueobject';

export class AttackStarshipCommand {
    readonly target: StarshipId;
    readonly attackedBy: StarshipId;

    constructor(payload: { readonly target: StarshipId, readonly  attackedBy: StarshipId }) {
        this.target = payload.target;
        this.attackedBy = payload.attackedBy;
    }
}
