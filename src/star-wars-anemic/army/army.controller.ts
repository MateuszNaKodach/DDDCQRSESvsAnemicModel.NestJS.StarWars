import {Body, Controller, HttpCode, Param, Post} from '@nestjs/common';
import {ArmyService} from './army.service';
import {Fraction} from '../../star-wars-event-sourcing/write/sharedkernel/domain/fraction.enum';

@Controller('/anemic/army')
export class ArmyController {

    constructor(private armyService: ArmyService) {
    }

    @Post()
    newArmy(
        @Body('fraction') fraction: Fraction,
        @Body('soldiers') soldiers: number,
    ) {
        return this.armyService.recruitSoldiers(fraction, soldiers);
    }

    @HttpCode(200)
    @Post(':id/soldiers-transfer')
    orderSoldiersTransfer(
        @Param('id') id: string,
        @Body('starshipId') starshipId: string,
        @Body('soldiers') soldiers: number,
    ) {
        return this.armyService.orderSoldiersToStarshipTransfer(id, soldiers, starshipId);
    }
}
