export class Condition {

    private constructor(private readonly points: number) {
    }

    static of(points: number): Condition {
        return new Condition(points);
    }

    static full(): Condition {
        return new Condition(100);
    }

    plus(points: number): Condition {
        return new Condition(this.points + points);
    }

    minus(points: number): Condition {
        return new Condition(this.points - points);
    }

    smallerOrEqualsTo(another: Condition): boolean {
        return this.points <= another.points;
    }

}
