export class EventStreamVersion {

    constructor(readonly raw: number) {
    }

    static exactly(raw: number) {
        return new EventStreamVersion(raw);
    }

    static any() {
        return undefined;
    }
}
