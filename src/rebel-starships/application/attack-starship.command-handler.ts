import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {AttackStarshipCommand} from './attack-starship.command';
import {StarshipRepository} from '../domain/starship.repository';
import {Inject} from '@nestjs/common';

@CommandHandler(AttackStarshipCommand)
export class AttackStarshipCommandHandler implements ICommandHandler {

    constructor(
        @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
    ) {
    }

    async execute(command: AttackStarshipCommand) {
        const starship = await this.starshipRepository.findById(command.target);
        // tslint:disable-next-line:no-console
        console.log('Found', starship);
        return;
    }

}
