import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {StarshipDomainEvent} from '../domain/starship.domain-events';
import {EmailAddress, EmailSender} from './email-sender.port';
import {Inject} from '@nestjs/common';

export namespace StarshipEventHandler {

    @EventsHandler(StarshipDomainEvent.StarshipDestroyed)
    export class StarshipDestroyed implements IEventHandler<StarshipDomainEvent.StarshipDestroyed> {

        constructor(@Inject('EmailSender') private emailSender: EmailSender) {
        }

        handle(event: StarshipDomainEvent.StarshipDestroyed) {
            return this.emailSender.send({
                to: EmailAddress.from('rebelion@starwars-eventsourcing.com'),
                content: 'Starship destroyed!',
            });
        }

    }

    export const All = [StarshipDestroyed];

}
