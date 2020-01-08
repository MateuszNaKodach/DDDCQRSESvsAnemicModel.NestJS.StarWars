import uuid = require('uuid');
import {AggregateId} from './aggregate-id.valueobject';

export class ArmyId implements AggregateId {
    private constructor(readonly raw: string) {
    }

    static generate() {
        return new ArmyId(uuid.v4());
    }

    static of(raw: string) {
        return new ArmyId(raw);
    }

    toString() {
        return this.raw;
    }
}
