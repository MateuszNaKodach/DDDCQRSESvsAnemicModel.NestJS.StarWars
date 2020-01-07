import {StarshipId} from '../domain/starship-id.valueobject';
import {Fraction} from '../domain/fraction.enum';
import {Condition} from '../domain/condition.valueobject';

export namespace StarshipCommand {

    export class SendStarshipToBattle {
        constructor(readonly id: StarshipId,
                    readonly fraction: Fraction,
        ) {
        }
    }

    export class AttackStarship {
        constructor(
            readonly target: StarshipId,
            readonly power: Condition,
        ) {
        }
    }

    export class RepairStarship {
        constructor(
            readonly target: StarshipId,
            readonly by: Condition,
        ) {
        }
    }

    export class CaptureStarship {
        constructor(
            readonly target: StarshipId,
            readonly by: Fraction,
        ) {
        }
    }

}
