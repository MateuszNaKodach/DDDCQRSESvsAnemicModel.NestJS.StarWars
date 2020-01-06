import {StarshipId} from './starship-id.valueobject';

export class StarshipDestroyed {

    constructor(
        public readonly starshipId: StarshipId,
        public readonly destroyedBy: StarshipId,
    ) {
    }
}
