import {Module, OnModuleInit} from '@nestjs/common';
import {StarshipsController} from './starship/starships.controller';
import {StarshipsService} from './starship/starships.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Starship} from './starship/starship.typeorm-entity';
import {Soldier} from './army/soldier.typeorm-entity';
import {Army} from './army/army.typeorm-entity';
import {ArmyController} from './army/army.controller';
import {ArmyService} from './army/army.service';
import {Fraction} from '../star-wars-event-sourcing/write/sharedkernel/domain/fraction.enum';

@Module({
    imports: [TypeOrmModule.forFeature([Starship, Soldier, Army])],
    controllers: [StarshipsController, ArmyController],
    providers: [StarshipsService, ArmyService],
})
export class StarWarsAnemicModule implements OnModuleInit {

    constructor(private armyService: ArmyService) {
    }

    async onModuleInit() {
        const armyId = await this.armyService.recruitSoldiers(Fraction.REBELLION, 100);
        console.log(armyId);
    }

}
