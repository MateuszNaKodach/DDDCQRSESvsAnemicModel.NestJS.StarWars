import {Injectable} from '@nestjs/common';
import {Fraction} from '../../star-wars-event-sourcing/write/sharedkernel/domain/fraction.enum';
import {InjectRepository} from '@nestjs/typeorm';
import {Army} from './army.typeorm-entity';
import {Repository} from 'typeorm';
import {Soldier} from './soldier.typeorm-entity';
import {Starship} from '../starship/starship.typeorm-entity';

@Injectable()
export class ArmyService {

    constructor(@InjectRepository(Army) private readonly armyRepository: Repository<Army>,
                @InjectRepository(Starship) private readonly starshipRepository: Repository<Starship>) {
    }

    recruitSoldiers(fraction: Fraction, soldiersCount: number): Promise<string> {
        const newArmy = new Army();
        newArmy.fraction = fraction;
        newArmy.soldiers = this.createNewSoldiers(soldiersCount);
        return this.armyRepository.save(newArmy)
            .then(it => it.id);
    }

    async orderSoldiersToStarshipTransfer(armyId: string, soldiersCount: number, starshipId: string): Promise<void> {
        const army = await this.armyRepository.findOne({where: {id: armyId}, relations: ['soldiers']});
        const starship = await this.starshipRepository.findOne({where: {id: starshipId}});
        const soldiersNotOnStarship = army.soldiers.filter(it => !it.starship);
        if (soldiersNotOnStarship.length < soldiersCount) {
            throw new Error(`No sufficient count of soldiers to transfer to starship! Only ${soldiersNotOnStarship.length} left.`);
        }
        for (let i = 0; i < soldiersCount; i++) {
            soldiersNotOnStarship[i].starship = starship;
        }
        return this.armyRepository.save(army).then();
    }

    private createNewSoldiers(howMany: number) {
        return [...Array(howMany).keys()].map(() => new Soldier());
    }

}
