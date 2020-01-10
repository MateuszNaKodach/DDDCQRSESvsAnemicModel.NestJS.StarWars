export class AggregateRootVersion {

    constructor(readonly raw: number) {
    }

    static of(raw: number) {
        return new AggregateRootVersion(raw);
    }

    static zero() {
        return new AggregateRootVersion(0);
    }
}
