import {BadRequestException, Body, Controller, Get, Inject, Param, Post} from '@nestjs/common';
import {CommandBus} from '@nestjs/cqrs';
import {AttackStarshipRequestBody} from './attack-starship.request-body';
import {StarshipId} from '../../domain/starship-id.valueobject';
import {Fraction} from '../../domain/fraction.enum';
import {StarshipCommand} from '../../application/starship.commands';
import SendStarshipToBattle = StarshipCommand.SendStarshipToBattle;
import AttackStarship = StarshipCommand.AttackStarship;
import {Condition} from '../../domain/condition.valueobject';
import {Importance} from '../../domain/importance.enum';
import {RepairStarshipRequestBody} from './repair-starship.request-body';
import RepairStarship = StarshipCommand.RepairStarship;
import {CaptureStarshipRequestBody} from './capture-starship.request-body';
import CaptureStarship = StarshipCommand.CaptureStarship;
import {StarshipRepository} from '../../domain/starship.repository';

@Controller('starships')
export class StarshipsController {

    constructor(
        private readonly commandBus: CommandBus,
        @Inject('StarshipRepository') private repository: StarshipRepository, // TODO: Delete!
    ) {
    }

    @Post()
    sendStarshipToBattle(
        @Body('fraction') fraction: Fraction,
        @Body('importance') importance: Importance,
    ) {
        return this.commandBus
            .execute(new SendStarshipToBattle(StarshipId.generate(), fraction, importance))
            .then(it => it.raw);
    }

    @Post('/attack')
    attackStarship(@Body() requestBody: AttackStarshipRequestBody) {
        const {targetId, power} = requestBody;
        return this.commandBus
            .execute(new AttackStarship(StarshipId.of(targetId), Condition.of(power)))
            .catch((e: Error) => Promise.reject(new BadRequestException(e.message)));
    }

    @Post('/reparation')
    repairStarship(@Body() requestBody: RepairStarshipRequestBody) {
        const {targetId, conditionPoints} = requestBody;
        return this.commandBus
            .execute(new RepairStarship(StarshipId.of(targetId), Condition.of(conditionPoints)));
    }

    @Post('/capturation')
    captureStarship(@Body() requestBody: CaptureStarshipRequestBody) {
        const {targetId, byFraction} = requestBody;
        return this.commandBus
            .execute(new CaptureStarship(StarshipId.of(targetId), byFraction));
    }

    @Get(':id') // TODO: Delete!
    getStarshipById(@Param('id') id: string) {
        return this.repository.findById(StarshipId.of(id));
    }

}
