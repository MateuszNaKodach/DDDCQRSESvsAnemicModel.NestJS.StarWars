import {Starship} from './starship.aggregate-root';
import {TimeProvider} from '../../../../event-store/time.provider';
import {SystemTimeProvider} from '../../../../event-store/system-time-provider.service';
import {StarshipDomainEvent} from './starship.domain-events';
import {StarshipId} from './starship-id.valueobject';
import {Fraction} from '../../sharedkernel/domain/fraction.enum';
import StarshipPrepared = StarshipDomainEvent.StarshipPrepared;
import SoldiersAddedToStarshipCrew = StarshipDomainEvent.SoldiersAddedToStarshipCrew;
import {Soldier} from '../../sharedkernel/domain/soldier.entity';
import StarshipSentToBattle = StarshipDomainEvent.StarshipSentToBattle;

describe('Feature: Control starships in the fleet', () => {

    const timeProvider: TimeProvider = new SystemTimeProvider();

    describe('Scenario: Send starship with crew to battle', () => {

        const starship = new Starship(timeProvider);
        const starshipId = StarshipId.generate();
        const fraction = Fraction.REBELLION;

        describe('Given: Prepared starship with a one crew member', () => {
            starship.loadFromHistory([
                StarshipPrepared.newFrom(starshipId, timeProvider.currentDate(), {fraction}),
                SoldiersAddedToStarshipCrew.newFrom(starshipId, timeProvider.currentDate(), {fraction, soldiers: generateSoldiers(1)}),
            ]);

            describe('When: try to send starship to battle', () => {
                starship.sendToBattle();

                it('Then: starship should be sent to battle', () => {
                    expect(starship.getUncommittedEvents().map(it => it.constructor)).toContain(
                        StarshipSentToBattle,
                    );
                });
            });
        });

    });

});

function generateSoldiers(count: number): Soldier[] {
    return [...Array(count).keys()].map(() => Soldier.recruit());
}
