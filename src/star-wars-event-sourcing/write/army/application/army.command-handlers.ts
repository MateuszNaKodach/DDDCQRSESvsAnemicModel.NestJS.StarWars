import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {TimeProvider} from '../../sharedkernel/application/time.provider';
import {ArmyCommand} from './army.commands';
import {ArmyRepository} from '../domain/army.repository';
import {ArmyId} from '../../sharedkernel/domain/army-id.valueobject';
import {Army} from '../domain/army.aggregate-root';

export namespace ArmyCommandHandler {

    @CommandHandler(ArmyCommand.RecruitSoldiers)
    export class RecruitSoldiers implements ICommandHandler<ArmyCommand.RecruitSoldiers> {

        constructor(
            @Inject('ArmyRepository') private armyRepository: ArmyRepository,
            @Inject('TimeProvider') private timeProvider: TimeProvider,
        ) {
        }

        async execute({id, fraction, soldiersCount}: ArmyCommand.RecruitSoldiers): Promise<ArmyId> {
            const army = new Army(this.timeProvider);
            army.recruitSoldiers(id, fraction, soldiersCount);
            await this.armyRepository.save(army);
            return id;
        }

    }

    @CommandHandler(ArmyCommand.OrderSoldiersToStarshipTransfer)
    export class OrderSoldiersToStarshipTransfer implements ICommandHandler<ArmyCommand.OrderSoldiersToStarshipTransfer> {

        constructor(
            @Inject('ArmyRepository') private armyRepository: ArmyRepository,
        ) {
        }

        async execute(command: ArmyCommand.OrderSoldiersToStarshipTransfer) {
            return executeCommand(
                this.armyRepository,
                command.id,
                starship => starship.orderSoldiersToStarshipTransfer(command.soldiersCount, command.starshipId),
            );
        }

    }

    const executeCommand = async (repository: ArmyRepository, targetId: ArmyId, command: (target: Army) => void): Promise<void> => {
        const army = await repository.findById(targetId);
        if (!army) {
            throw new Error(`Army with id ${targetId} not found!`);
        }
        command(army);
        return repository.save(army);
    };

    export const All = [RecruitSoldiers, OrderSoldiersToStarshipTransfer];

}
