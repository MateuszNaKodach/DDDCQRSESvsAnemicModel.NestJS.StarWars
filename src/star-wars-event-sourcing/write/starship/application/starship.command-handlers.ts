import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {StarshipRepository} from '../domain/starship.repository';
import {TimeProvider} from '../../../../event-store/time.provider';
import {StarshipId} from '../domain/starship-id.valueobject';
import {Starship} from '../domain/starship.aggregate-root';
import {StarshipCommand} from './starship.commands';

export namespace StarshipCommandHandler {

    @CommandHandler(StarshipCommand.PrepareNewStarship)
    export class PrepareNewStarship implements ICommandHandler<StarshipCommand.PrepareNewStarship> {

        constructor(
            @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
            @Inject(TimeProvider) private timeProvider: TimeProvider,
        ) {
        }

        async execute({id, fraction}: StarshipCommand.PrepareNewStarship): Promise<StarshipId> {
            const starship = new Starship(this.timeProvider);
            starship.prepare(id, fraction);
            await this.starshipRepository.save(starship);
            return id;
        }

    }

    @CommandHandler(StarshipCommand.SendStarshipToBattle)
    export class SendStarshipToBattle implements ICommandHandler<StarshipCommand.SendStarshipToBattle> {

        constructor(
            @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
        ) {
        }

        async execute(command: StarshipCommand.SendStarshipToBattle) {
            return executeCommand(
                this.starshipRepository,
                command.id,
                starship => starship.sendToBattle(),
            );
        }

    }

    @CommandHandler(StarshipCommand.ReportStarshipAttack)
    export class ReportStarshipAttack implements ICommandHandler<StarshipCommand.ReportStarshipAttack> {

        constructor(
            @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
        ) {
        }

        async execute(command: StarshipCommand.ReportStarshipAttack) {
            return executeCommand(
                this.starshipRepository,
                command.target,
                starship => starship.reportAttack(command.power),
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

    @CommandHandler(StarshipCommand.AddSoldiersToStarshipCrew)
    export class AddSoldiersToStarshipCrew implements ICommandHandler<StarshipCommand.AddSoldiersToStarshipCrew> {

        constructor(
            @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
        ) {
        }

        async execute(command: StarshipCommand.AddSoldiersToStarshipCrew) {
            return executeCommand(
                this.starshipRepository,
                command.target,
                starship => starship.addSoldiersToCrew(command.soldiers),
            );
        }

    }

    @CommandHandler(StarshipCommand.SendSoldiersBackToArmy)
    export class SendSoldiersBackToArmy implements ICommandHandler<StarshipCommand.SendSoldiersBackToArmy> {

        constructor(
            @Inject('StarshipRepository') private starshipRepository: StarshipRepository,
        ) {
        }

        async execute(command: StarshipCommand.SendSoldiersBackToArmy) {
            return executeCommand(
                this.starshipRepository,
                command.starship,
                starship => starship.sendSoldiersBackToArmy(command.soldiers),
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

    export const All = [
        PrepareNewStarship,
        SendStarshipToBattle,
        ReportStarshipAttack,
        RepairStarship,
        CaptureStarship,
        AddSoldiersToStarshipCrew,
        SendSoldiersBackToArmy,
    ];

}
