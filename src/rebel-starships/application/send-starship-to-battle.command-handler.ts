import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Starship} from '../domain/starship.aggregate-root';
import {SendStarshipToBattleCommand} from './send-starship-to-battle.command';
import {TimeProvider} from '../../nest-time-provider/time.provider';
import {Inject} from '@nestjs/common';
import {StarshipRepository} from '../domain/starship.repository';
import {StarshipId} from '../domain/starship-id.valueobject';

@CommandHandler(SendStarshipToBattleCommand)
export class SendStarshipToBattleCommandHandler implements ICommandHandler {

    constructor(
        @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
        @Inject('TimeProvider') private timeProvider: TimeProvider,
    ) {
    }

    async execute(command: SendStarshipToBattleCommand): Promise<StarshipId> {
        const starship = new Starship(this.timeProvider);
        starship.sendToBattle(command.id, command.fraction);
        await this.starshipRepository.save(starship);
        return command.id;
    }

}
