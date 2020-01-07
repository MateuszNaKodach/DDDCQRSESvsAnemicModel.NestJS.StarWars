import {Body, Controller, Post} from '@nestjs/common';
import {CommandBus} from '@nestjs/cqrs';
import {AttackStarshipRequestBody} from './attack-starship.request-body';
import {StarshipId} from '../../domain/starship-id.valueobject';
import {Fraction} from '../../domain/fraction.enum';
import {StarshipCommand} from '../../application/starship.commands';
import SendStarshipToBattle = StarshipCommand.SendStarshipToBattle;
import AttackStarship = StarshipCommand.AttackStarship;
import {Condition} from '../../domain/condition.valueobject';
import {Importance} from '../../domain/importance.enum';

@Controller('starships')
export class StarshipsController {

    constructor(private readonly commandBus: CommandBus) {
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
            .execute(new AttackStarship(StarshipId.of(targetId), Condition.of(power)));
    }

    /*
    @Post('/reparation')
    repairStarship(@Body() requestBody: AttackStarshipDto) {
        const {targetId, starshipIdWhichAttacked} = requestBody;
        return this.commandBus
            .execute(new AttackStarshipCommand(StarshipId.of(targetId), StarshipId.of(starshipIdWhichAttacked)));
    }*/

}
