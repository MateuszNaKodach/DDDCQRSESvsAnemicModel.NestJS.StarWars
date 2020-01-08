import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Starship} from './starship.typeorm-entity';
import {Soldier} from '../army/soldier.typeorm-entity';
import {Fraction} from '../../star-wars-event-sourcing/write/domain/fraction.enum';

@Injectable()
export class StarshipsService {

    constructor(@InjectRepository(Starship) private readonly starshipRepository: Repository<Starship>,
                @InjectRepository(Soldier) private readonly soldierRepository: Repository<Soldier>) {
    }

    prepare(fraction: Fraction): Promise<string> {
        const starship = new Starship();
        starship.fraction = fraction;
        return this.starshipRepository.save(starship)
            .then(it => it.id);
    }

    async sendToBattle(starshipId: string): Promise<void> {
        const starship = await this.starshipRepository.findOne({where: {id: starshipId}});
        const soldiersOnStarship = await this.soldierRepository.count({where: {starship}});
        if (soldiersOnStarship === 0) {
            throw new Error('Cannot send to battle starship without crew!');
        }
        starship.condition = 100;
        starship.inBattle = true;
        return this.starshipRepository.save(starship).then();
    }
}
