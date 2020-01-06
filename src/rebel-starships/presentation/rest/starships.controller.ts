import {Body, Controller, Post} from '@nestjs/common';
import {CommandBus} from '@nestjs/cqrs';
import {AttackStarshipRequestBody} from './attack-starship.request-body';
import {AttackStarshipCommand} from '../../application/attack-starship.command';
import {StarshipId} from '../../domain/starship-id.valueobject';
import {Fraction} from '../../domain/fraction.enum';
import {SendStarshipToBattleCommand} from '../../application/send-starship-to-battle.command';

@Controller('starships')
export class StarshipsController {

    constructor(private readonly commandBus: CommandBus) {
    }

    @Post()
    sendStarshipToBattle(@Body('fraction') fraction: Fraction) {
        return this.commandBus
            .execute(
                new SendStarshipToBattleCommand({
                        id: StarshipId.generate(),
                        fraction,
                    },
                ),
            ).then(it => it.raw);
    }

    @Post('/attack')
    attackStarship(@Body() requestBody: AttackStarshipRequestBody) {
        const {targetId, starshipIdWhichAttacked} = requestBody;
        return this.commandBus
            .execute(
                new AttackStarshipCommand({
                        target: StarshipId.of(targetId),
                        attackedBy: StarshipId.of(starshipIdWhichAttacked),
                    },
                ),
            );
    }

    /*
    @Post('/reparation')
    repairStarship(@Body() requestBody: AttackStarshipDto) {
        const {targetId, starshipIdWhichAttacked} = requestBody;
        return this.commandBus
            .execute(new AttackStarshipCommand(StarshipId.of(targetId), StarshipId.of(starshipIdWhichAttacked)));
    }*/

}
