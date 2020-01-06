import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {AttackStarshipCommand} from './attack-starship.command';
import {StarshipRepository} from '../domain/starship.repository';

@CommandHandler(AttackStarshipCommand)
export class AttackStarshipCommandHandler implements ICommandHandler {

    constructor(
        private starshipRepository: StarshipRepository,
    ) {
    }

    async execute(command: AttackStarshipCommand) {

        return;
    }

}
