import {Injectable} from '@nestjs/common';
import {ICommand, IEvent, ofType, Saga} from '@nestjs/cqrs';
import {StarshipDomainEvent} from '../domain/starship.domain-events';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {Fraction} from '../domain/fraction.enum';
import StarshipCaptured = StarshipDomainEvent.StarshipCaptured;
import {Condition} from '../domain/condition.valueobject';
import {StarshipCommand} from './starship.commands';
import AttackStarship = StarshipCommand.ReportStarshipAttack;

@Injectable()
export class AttackStarshipCapturedByEmpireSaga {

    // TODO: Moze jakis inny na 2 streamy
    @Saga()
    starshipCapturedByEmpire = (events$: Observable<IEvent>): Observable<ICommand> => {
        return events$.pipe(
            ofType(StarshipCaptured),
            filter(event => event.payload.by === Fraction.EMPIRE),
            filter(event => event.payload.with.isSmallerOrEqualsTo(Condition.of(10))),
            map(event => new AttackStarship(event.aggregateId, Condition.of(10))),
        );
    }

}

//TODO: Example with UI - problemy EventSourcing
