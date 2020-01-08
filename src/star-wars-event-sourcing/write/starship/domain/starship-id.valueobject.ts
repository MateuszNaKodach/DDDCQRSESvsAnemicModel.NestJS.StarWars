import uuid = require('uuid');
import {AggregateId} from '../../sharedkernel/domain/aggregate-id.valueobject';

export class StarshipId implements AggregateId {
    private constructor(readonly raw: string) {
    }

    static generate() {
        return new StarshipId(uuid.v4());
    }

    static of(raw: string) {
        return new StarshipId(raw);
    }

    toString() {
        return this.raw;
    }
}
