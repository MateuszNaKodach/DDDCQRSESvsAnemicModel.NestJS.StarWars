export class Condition {

    private constructor(private readonly points: number) {
    }

    static of(points: number): Condition {
        return new Condition(points);
    }

    static full(): Condition {
        return new Condition(100);
    }

    static zero(): Condition {
        return new Condition(0);
    }

    isZero(): boolean {
        return this.points === 0;
    }

    plus(condition: Condition): Condition {
        return new Condition(this.points + condition.points);
    }

    minus(condition: Condition): Condition {
        const newPoints = this.points - condition.points;
        return newPoints < 0 ? new Condition(0) : new Condition(newPoints);
    }

    isGraterThan(another: Condition): boolean {
        return this.points > another.points;
    }

    isSmallerOrEqualsTo(another: Condition): boolean {
        return this.points <= another.points;
    }

}
