import {BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post} from '@nestjs/common';
import {CommandBus} from '@nestjs/cqrs';
import {Fraction} from '../../../sharedkernel/domain/fraction.enum';
import {StarshipId} from '../../../starship/domain/starship-id.valueobject';
import {ArmyCommand} from '../../application/army.commands';
import RecruitSoldiers = ArmyCommand.RecruitSoldiers;
import {ArmyId} from '../../../sharedkernel/domain/army-id.valueobject';
import OrderSoldiersToStarshipTransfer = ArmyCommand.OrderSoldiersToStarshipTransfer;
import {ArmyRepository} from '../../domain/army.repository';

@Controller('/event-sourcing/army')
export class ArmyController {

    constructor(
        private readonly commandBus: CommandBus,
        @Inject('ArmyRepository') private armyRepository: ArmyRepository,
    ) {
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

    @HttpCode(200)
    @Post(':id/soldiers-transfer')
    orderSoldiersTransfer(
        @Param('id') id: string,
        @Body('starshipId') starshipId: string,
        @Body('soldiers') soldiers: number,
    ) {
        return this.commandBus
            .execute(new OrderSoldiersToStarshipTransfer(ArmyId.of(id), soldiers, StarshipId.of(starshipId)))
            .catch((e: Error) => Promise.reject(new BadRequestException(e.message)));
    }

    @Get(':id')
    getArmy(
        @Param('id') id: string,
    ) {
        return this.armyRepository.findById(ArmyId.of(id));
    }
}
