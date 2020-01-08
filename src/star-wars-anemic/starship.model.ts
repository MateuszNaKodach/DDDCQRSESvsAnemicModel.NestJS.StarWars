import {Fraction} from '../star-wars-event-sourcing/write/domain/fraction.enum';

export class Starship {
    readonly id: string;
    fraction: Fraction;
    condition: number;
    inBattle: boolean = false;

    constructor(id: string, fraction: Fraction) {
        this.id = id;
        this.fraction = fraction;
    }

    static prepareNew(id: string, fraction: Fraction) {
        return new Starship(id, fraction);
    }

    sendToBattle() {
        this.inBattle = true;
        this.condition = 100;
    }

    isDestroyed(): boolean {
        return this.condition === 0;
    }


}
