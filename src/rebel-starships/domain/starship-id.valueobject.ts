export class StarshipId {
    private constructor(readonly raw: string) {
    }

    static of(raw: string) {
        return new StarshipId(raw);
    }
}
