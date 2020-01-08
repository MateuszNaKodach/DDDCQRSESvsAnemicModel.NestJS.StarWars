import {SoldierId} from '../../sharedkernel/domain/soldier-id.valueobject';

export class Soldier {
    constructor(readonly id: SoldierId) {
    }

    static recruit(): Soldier {
        return new Soldier(SoldierId.generate());
    }

}
