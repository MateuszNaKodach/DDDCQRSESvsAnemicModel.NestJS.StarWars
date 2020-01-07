import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {StarshipRepository} from '../domain/starship.repository';
import {TimeProvider} from './time.provider';
import {StarshipId} from '../domain/starship-id.valueobject';
import {Starship} from '../domain/starship.aggregate-root';
import {StarshipCommand} from './starship.commands';

export namespace StarshipCommandHandler {

    @CommandHandler(StarshipCommand.SendStarshipToBattle)
    export class SendStarshipToBattle implements ICommandHandler<StarshipCommand.SendStarshipToBattle> {

        constructor(
            @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
            @Inject('TimeProvider') private timeProvider: TimeProvider,
        ) {
        }

        async execute({id, fraction}: StarshipCommand.SendStarshipToBattle): Promise<StarshipId> {
            const starship = new Starship(this.timeProvider);
            starship.sendToBattle(id, fraction);
            await this.starshipRepository.save(starship);
            return id;
        }

    }

    @CommandHandler(StarshipCommand.AttackStarship)
    export class AttackStarship implements ICommandHandler<StarshipCommand.AttackStarship> {

        constructor(
            @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
        ) {
        }

        async execute(command: StarshipCommand.AttackStarship) {
            return executeCommand(
                this.starshipRepository,
                command.target,
                starship => starship.attack(command.power),
            );
        }

    }

    @CommandHandler(StarshipCommand.RepairStarship)
    export class RepairStarship implements ICommandHandler<StarshipCommand.RepairStarship> {

        constructor(
            @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
        ) {
        }

        async execute(command: StarshipCommand.RepairStarship) {
            return executeCommand(
                this.starshipRepository,
                command.target,
                starship => starship.repair(command.by),
            );
        }

    }

    @CommandHandler(StarshipCommand.CaptureStarship)
    export class CaptureStarship implements ICommandHandler<StarshipCommand.CaptureStarship> {

        constructor(
            @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
        ) {
        }

        async execute(command: StarshipCommand.CaptureStarship) {
            return executeCommand(
                this.starshipRepository,
                command.target,
                starship => starship.capture(command.by),
            );
        }

    }

    const executeCommand = async (repository: StarshipRepository, targetId: StarshipId, command: (target: Starship) => void): Promise<void> => {
        const starship = await repository.findById(targetId);
        if (!starship) {
            throw new Error(`Starship with id ${targetId} not found!`);
        }
        command(starship);
        return repository.save(starship);
    };

    export const All = [SendStarshipToBattle, AttackStarship, RepairStarship, CaptureStarship];

}
