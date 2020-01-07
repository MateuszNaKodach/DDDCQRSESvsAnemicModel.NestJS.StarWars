import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {StarshipRepository} from '../domain/starship.repository';
import {TimeProvider} from './time.provider';
import {StarshipId} from '../domain/starship-id.valueobject';
import {Starship} from '../domain/starship.aggregate-root';
import {StarshipCommand} from './starship.commands';

export namespace StarshipCommandHandler {

    @CommandHandler(StarshipCommand.AttackStarship)
    export class AttackStarship implements ICommandHandler {

        constructor(
            @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
        ) {
        }

        async execute(command: StarshipCommand.AttackStarship) {
            const starship = await this.starshipRepository.findById(command.target);
            // tslint:disable-next-line:no-console
            console.log('Found', starship);
            return;
        }

    }

    @CommandHandler(StarshipCommand.SendStarshipToBattle)
    export class SendStarshipToBattle implements ICommandHandler {

        constructor(
            @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
            @Inject('TimeProvider') private timeProvider: TimeProvider,
        ) {
        }

        async execute(command: StarshipCommand.SendStarshipToBattle): Promise<StarshipId> {
            const starship = new Starship(this.timeProvider);
            starship.sendToBattle(command.id, command.fraction);
            await this.starshipRepository.save(starship);
            return command.id;
        }

    }

    export const All = [AttackStarship, SendStarshipToBattle];

}
