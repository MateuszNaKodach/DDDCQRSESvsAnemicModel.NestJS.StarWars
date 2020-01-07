import uuid = require('uuid');

export class SoldierId {
    private constructor(readonly raw: string) {
    }

    static generate() {
        return new SoldierId(uuid.v4());
    }

    static of(raw: string) {
        return new SoldierId(raw);
    }

    toString() {
        return this.raw;
    }
}
