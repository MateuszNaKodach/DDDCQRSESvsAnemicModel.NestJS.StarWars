export class Condition {

    private constructor(private readonly points: number) {
    }

    static of(points: number): Condition {
        return new Condition(points);
    }

    plus(points: number): Condition {
        return new Condition(this.points + points);
    }

    minus(points: number): Condition {
        return new Condition(this.points - points);
    }

}
