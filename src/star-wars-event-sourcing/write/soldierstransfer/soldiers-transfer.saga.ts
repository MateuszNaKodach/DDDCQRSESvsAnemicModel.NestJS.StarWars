import {Injectable} from '@nestjs/common';
import {ICommand, IEvent, ofType, Saga} from '@nestjs/cqrs';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StarshipCommand} from '../starship/application/starship.commands';
import {ArmyDomainEvent} from '../army/domain/army.domain-events';
import SoldiersTransferToStarshipOrdered = ArmyDomainEvent.SoldiersTransferToStarshipOrdered;
import AddSoldiersToStarshipCrew = StarshipCommand.AddSoldiersToStarshipCrew;

@Injectable()
export class SoldiersTransferSaga {

    @Saga()
    soldiersTransferToStarship = (events$: Observable<IEvent>): Observable<ICommand> => {
        return events$.pipe(
            ofType(SoldiersTransferToStarshipOrdered),
            map(event => new AddSoldiersToStarshipCrew(event.payload.starshipId, event.payload.soldiers)),
        );
    };

    //TODO: Add send back to army

}
