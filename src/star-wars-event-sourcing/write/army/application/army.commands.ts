import {StarshipId} from '../../starship/domain/starship-id.valueobject';
import {Fraction} from '../../sharedkernel/domain/fraction.enum';
import {ArmyId} from '../../sharedkernel/domain/army-id.valueobject';

export namespace ArmyCommand {

    export class RecruitSoldiers {
        constructor(readonly id: ArmyId,
                    readonly fraction: Fraction,
                    readonly soldiersCount: number,
        ) {
        }
    }

    export class OrderSoldiersToStarshipTransfer {
        constructor(readonly id: ArmyId,
                    readonly soldiersCount: number,
                    readonly starshipId: StarshipId,
        ) {
        }
    }

}
