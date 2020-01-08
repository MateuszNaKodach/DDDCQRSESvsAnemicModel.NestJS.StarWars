import {AggregateRoot} from '@nestjs/cqrs';
import {StarshipId} from './starship-id.valueobject';
import {Fraction} from './fraction.enum';
import {Condition} from './condition.valueobject';
import {TimeProvider} from '../application/time.provider';
import {StarshipDomainEvent} from './starship.domain-events';
import StarshipSentToBattle = StarshipDomainEvent.StarshipSentToBattle;
import StarshipAttacked = StarshipDomainEvent.StarshipAttacked;
import StarshipRepaired = StarshipDomainEvent.StarshipRepaired;
import StarshipDestroyed = StarshipDomainEvent.StarshipDestroyed;
import StarshipCaptured = StarshipDomainEvent.StarshipCaptured;
import {Soldier} from './soldier.entity';
import SoldiersAddedToStarshipCrew = StarshipDomainEvent.SoldiersAddedToStarshipCrew;
import SoldiersSentBackToArmy = StarshipDomainEvent.SoldiersSentBackToArmy;
import StarshipPrepared = StarshipDomainEvent.StarshipPrepared;

// TODO: Może żołnierze? I nie można wysłać starship bez żołnierzy?
export class Starship extends AggregateRoot {

    private id: StarshipId;
    private fraction: Fraction;
    private condition: Condition;
    private crew: Soldier[] = [];
    private inBattle: boolean = false;
    private timeProvider: TimeProvider;

    constructor(timeProvider: TimeProvider) {
        super();
        this.timeProvider = timeProvider;
    }

    prepare(id: StarshipId, fraction: Fraction) {
        this.apply(StarshipPrepared.newFrom(id, this.timeProvider.currentDate(), {fraction}));
    }

    sendToBattle() {
        if (this.crew.length === 0) {
            throw new Error('Cannot send to battle starship without crew!');
        }
        this.apply(StarshipSentToBattle.newFrom(this.id, this.timeProvider.currentDate(), {fraction: this.fraction}));
    }

    attack(power: Condition) {
        if (this.fraction === Fraction.REBELLION) {
            throw new Error('Do not attack ally starship!');
        }
        if (this.isDestroyed()) {
            throw new Error('Starship already destroyed!');
        }
        if (this.condition.isGraterThan(power)) {
            this.apply(
                StarshipAttacked.newFrom(this.id, this.timeProvider.currentDate(), {
                    fraction: this.fraction,
                    power,
                }),
            );
        } else {
            this.apply(
                StarshipDestroyed.newFrom(this.id, this.timeProvider.currentDate(), {
                    fraction: this.fraction,
                }),
            );
        }
    }

    repair(by: Condition) {
        if (this.fraction === Fraction.EMPIRE) {
            throw new Error('Do not repair enemy starship!');
        }
        if (this.isDestroyed()) {
            throw new Error('Starship already destroyed!');
        }
        this.apply(StarshipRepaired.newFrom(this.id, this.timeProvider.currentDate(), {fraction: this.fraction, repaired: by}));
    }

    capture(by: Fraction) {
        if (this.fraction === by) {
            throw new Error(`Starship already belongs to ${by}!`);
        }
        if (this.isDestroyed()) {
            throw new Error('Starship already destroyed!');
        }
        this.apply(
            StarshipCaptured.newFrom(this.id, this.timeProvider.currentDate(), {
                from: this.fraction,
                by: this.fraction,
                with: this.condition,
            }),
        );
    }

    addSoldiersToCrew(soldiers: Soldier[]) {
        if (this.fraction === Fraction.EMPIRE) {
            throw new Error('Do not send soldiers to enemy starship crew!');
        }
        this.apply(
            SoldiersAddedToStarshipCrew.newFrom(this.id, this.timeProvider.currentDate(), {
                fraction: this.fraction,
                soldiers,
            }),
        );
    }

    sendSoldiersBackToArmy(soldiersCount: number) {
        if (this.crew.length <= soldiersCount) {
            throw new Error(`You have to leave at least on soldier on the starship during the battle!`);
        }
        this.apply(
            SoldiersSentBackToArmy.newFrom(this.id, this.timeProvider.currentDate(), {
                fraction: this.fraction,
                soldiers: this.crew.slice(soldiersCount, this.crew.length),
            }),
        );
    }

    private isDestroyed(): boolean {
        return this.condition.isZero();
    }

    onStarshipPrepared(event: StarshipPrepared) {
        this.id = event.aggregateId;
        this.fraction = event.payload.fraction;
    }

    onStarshipSentToBattle(event: StarshipSentToBattle) {
        this.condition = Condition.full();
    }

    onStarshipAttacked(event: StarshipAttacked) {
        this.condition = this.condition.minus(event.payload.power);
    }

    onStarshipDestroyed(event: StarshipDestroyed) {
        this.condition = Condition.zero();
    }

    onStarshipRepaired(event: StarshipRepaired) {
        this.condition = this.condition.plus(event.payload.repaired);
    }

    onStarshipCaptured(event: StarshipCaptured) {
        this.fraction = event.payload.from;
    }

    onSoldiersAddedToStarshipCrew(event: SoldiersAddedToStarshipCrew) {
        this.crew.push(...event.payload.soldiers);
    }

    onSoldiersSentBackToArmy(event: SoldiersSentBackToArmy) {
        this.crew = this.crew.slice(0, event.payload.soldiers.length);
    }
}
