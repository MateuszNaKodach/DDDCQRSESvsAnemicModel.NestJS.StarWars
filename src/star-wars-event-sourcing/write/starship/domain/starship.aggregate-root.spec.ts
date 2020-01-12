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

    describe('Scenario: Send starship to battle', () => {

        let starship: Starship;
        const starshipId = StarshipId.generate();
        const fraction = Fraction.REBELLION;

        beforeEach(() => {
            starship = new Starship(timeProvider);
        });

        describe('Given: Starship prepared', () => {
            beforeEach(() => {
                starship.loadFromHistory([
                    StarshipPrepared.newFrom(starshipId, timeProvider.currentDate(), {fraction}),
                ]);
            });

            describe('And: One soldier added to starship crew', () => {

                beforeEach(() => {
                    starship.loadFromHistory([
                        SoldiersAddedToStarshipCrew.newFrom(starshipId, timeProvider.currentDate(), {fraction, soldiers: generateSoldiers(1)}),
                    ]);
                });

                describe('When: try to send starship to battle', () => {

                    it('Then: starship should be sent to battle', () => {
                        starship.sendToBattle();
                        expect(starship.getUncommittedEvents().map(it => it.constructor)).toContain(
                            StarshipSentToBattle,
                        );
                    });
                });

            });

            describe('When: try to send starship to battle', () => {

                it('Then: starship should not be sent to battle', () => {
                    expect(() => starship.sendToBattle()).toThrow();
                });
            });

        });

    });

});

function generateSoldiers(count: number): Soldier[] {
    return [...Array(count).keys()].map(() => Soldier.recruit());
}
