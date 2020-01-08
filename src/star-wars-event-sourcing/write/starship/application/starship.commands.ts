import {StarshipId} from '../domain/starship-id.valueobject';
import {Fraction} from '../../sharedkernel/domain/fraction.enum';
import {Condition} from '../domain/condition.valueobject';
import {Soldier} from '../../army/domain/soldier.entity';

export namespace StarshipCommand {

    export class PrepareNewStarship {
        constructor(readonly id: StarshipId,
                    readonly fraction: Fraction,
        ) {
        }
    }

    export class SendStarshipToBattle {
        constructor(readonly id: StarshipId) {
        }
    }

    export class ReportStarshipAttack {
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

    export class AddSoldiersToStarshipCrew {
        constructor(
            readonly target: StarshipId,
            readonly soldiers: Soldier[],
        ) {
        }
    }

    export class SendSoldiersBackToArmy {
        constructor(
            readonly starship: StarshipId,
            readonly fraction: Fraction,
            readonly soldiers: number,
        ) {
        }
    }

}
