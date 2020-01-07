import {Body, Controller, Inject, Param, Post} from '@nestjs/common';
import {CommandBus} from '@nestjs/cqrs';
import {Fraction} from '../../domain/fraction.enum';
import {StarshipId} from '../../domain/starship-id.valueobject';
import {ArmyCommand} from '../../application/army.commands';
import RecruitSoldiers = ArmyCommand.RecruitSoldiers;
import {ArmyId} from '../../domain/army-id.valueobject';
import OrderSoldiersToStarshipTransfer = ArmyCommand.OrderSoldiersToStarshipTransfer;

@Controller('/event-sourcing/army')
export class ArmyController {

    constructor(private readonly commandBus: CommandBus) {
    }

    @Post()
    newArmy(
        @Body('fraction') fraction: Fraction,
        @Body('soldiers') soldiers: number,
    ) {
        return this.commandBus
            .execute(new RecruitSoldiers(ArmyId.generate(), fraction, soldiers))
            .then(it => it.raw);
    }

    @Post(':id/soldiers-transfer')
    orderSoldiersTransfer(
        @Param('id') id: string,
        @Body('starshipId') starshipId: string,
        @Body('soldiers') soldiers: number,
    ) {
        return this.commandBus
            .execute(new OrderSoldiersToStarshipTransfer(ArmyId.generate(), soldiers, StarshipId.of(starshipId)));
    }
}
